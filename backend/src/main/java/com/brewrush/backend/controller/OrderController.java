package com.brewrush.backend.controller;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.brewrush.backend.model.Order;
import com.brewrush.backend.model.Product;
import com.brewrush.backend.repository.OrderRepository;
import com.brewrush.backend.repository.ProductRepository;

@RestController
@RequestMapping("/api/orders")

public class OrderController {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public OrderController(
            OrderRepository orderRepository,
            ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    // Get all orders from MongoDB
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return ResponseEntity.ok(orders);
    }

    // Save a new order
    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody Order order) {

        if (order == null
                || order.getItems() == null
                || order.getItems().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Map.of(
                            "error",
                            "Please add at least one product."
                    ));
        }

        double subtotal = 0;

        for (Order.OrderItem item : order.getItems()) {

            if (item.getProductId() == null
                    || item.getProductId().isBlank()
                    || item.getQuantity() <= 0) {
                return ResponseEntity.badRequest()
                        .body(Map.of(
                                "error",
                                "Each order item needs a valid product ID and quantity."
                        ));
            }

            Product product = productRepository
                    .findById(item.getProductId())
                    .orElse(null);

            if (product == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of(
                                "error",
                                "A selected product was not found."
                        ));
            }

            if (!product.isAvailable()) {
                return ResponseEntity.badRequest()
                        .body(Map.of(
                                "error",
                                product.getName() + " is unavailable."
                        ));
            }

            // Use product details and prices stored in MongoDB.
            item.setName(product.getName());
            item.setPrice(product.getPrice());

            subtotal += product.getPrice() * item.getQuantity();
        }

        double deliveryFee = 250.0;

        order.setSubtotal(subtotal);
        order.setDeliveryFee(deliveryFee);
        order.setTotal(subtotal + deliveryFee);
        order.setStatus("PLACED");
        order.setCreatedAt(Instant.now());

        Order savedOrder = orderRepository.save(order);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedOrder);
    }

    // Update an existing order's status
    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateOrderStatus(
            @PathVariable String id,
            @RequestBody Map<String, String> body) {

        String status = body.get("status");

        Set<String> allowedStatuses = Set.of(
                "PLACED",
                "PREPARING",
                "OUT_FOR_DELIVERY",
                "DELIVERED"
        );

        if (status == null || !allowedStatuses.contains(status)) {
            return ResponseEntity.badRequest()
                    .body(Map.of(
                            "error",
                            "Invalid status. Use PLACED, PREPARING, OUT_FOR_DELIVERY, or DELIVERED."
                    ));
        }

        Order order = orderRepository.findById(id).orElse(null);

        if (order == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Order not found."));
        }

        order.setStatus(status);

        Order updatedOrder = orderRepository.save(order);

        return ResponseEntity.ok(updatedOrder);
    }

    // Track an order using its displayed reference and phone number
    @GetMapping("/{id}/track")
    public ResponseEntity<?> trackOrder(
            @PathVariable String id,
            @RequestParam String phone) {

        String reference = id.trim().toUpperCase();

        // Supports BR-XXXXXX references and full MongoDB IDs.
        String suffix = reference.startsWith("BR-")
                ? reference.substring(3)
                : reference;

        // Find an order matching the reference and phone number.
        Order order = orderRepository.findAll().stream()
                .filter(item -> item.getId() != null)
                .filter(item ->
                        item.getId().equalsIgnoreCase(reference)
                        || item.getId().toUpperCase().endsWith(suffix))
                .filter(item ->
                        item.getPhone() != null
                        && phone != null
                        && item.getPhone().trim().equals(phone.trim()))
                .findFirst()
                .orElse(null);

        if (order == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "error",
                            "Order not found. Check your order reference and phone number."
                    ));
        }

        return ResponseEntity.ok(order);
    }
}