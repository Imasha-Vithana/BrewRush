package com.brewrush.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.brewrush.backend.model.Order;

public interface OrderRepository extends MongoRepository<Order, String> {
}