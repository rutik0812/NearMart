package com.nearmart.serviceimpl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nearmart.dto.*;
import com.nearmart.entity.*;
import com.nearmart.enums.OrderStatus;
import com.nearmart.exception.BadRequestException;
import com.nearmart.exception.InsufficientStockException;
import com.nearmart.exception.ResourceNotFoundException;
import com.nearmart.repository.*;
import com.nearmart.service.OrderService;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserRepository userRepository;
    private final ShopRepository shopRepository;
    private final ProductRepository productRepository;
    private final BillRepository billRepository;

    public OrderServiceImpl(
            OrderRepository orderRepository,
            OrderItemRepository orderItemRepository,
            UserRepository userRepository,
            ShopRepository shopRepository,
            ProductRepository productRepository,
            BillRepository billRepository) {

        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.userRepository = userRepository;
        this.shopRepository = shopRepository;
        this.productRepository = productRepository;
        this.billRepository = billRepository;
    }
    @Override
    public OrderResponse placeOrder(OrderRequest request, String phone) {

    	User user = userRepository.findByPhone(phone)
    	        .orElseThrow(() ->
    	                new ResourceNotFoundException("User not found"));
    	Shop shop = shopRepository.findById(request.getShopId())
    	        .orElseThrow(() ->
    	                new ResourceNotFoundException("Shop not found"));


        Order order = new Order();

        order.setUser(user);
        order.setShop(shop);
        order.setOrderStatus(OrderStatus.PENDING);

        order = orderRepository.save(order);

        BigDecimal total = BigDecimal.ZERO;

        List<OrderItem> orderItems = new ArrayList<>();

        for (OrderItemRequest itemRequest : request.getItems()) {

            Product product = productRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException("Product not found"));

            // Product should belong to selected shop
            if (!product.getShop().getShopId().equals(shop.getShopId())) {
            	throw new BadRequestException(
            	        "Product does not belong to this shop");
            }

            // Product should be available
            if (!Boolean.TRUE.equals(product.getIsAvailable())) {
            	throw new BadRequestException(
            	        product.getProductName()+" is unavailable");
            }

            // Stock validation
            if (product.getStockQuantity() < itemRequest.getQuantity()) {
            	throw new InsufficientStockException(
            	        "Insufficient stock for "+product.getProductName());
            }

            // Reduce stock
            product.setStockQuantity(
                    product.getStockQuantity() - itemRequest.getQuantity());

            productRepository.save(product);

            BigDecimal subTotal = product.getPrice()
                    .multiply(BigDecimal.valueOf(itemRequest.getQuantity()));

            total = total.add(subTotal);

            OrderItem orderItem = new OrderItem();

            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setPrice(product.getPrice());

            orderItems.add(orderItem);
        }

        orderItemRepository.saveAll(orderItems);

        order.setOrderItems(orderItems);
        order.setTotalPrice(total);

        Order savedOrder = orderRepository.save(order);

     // Create Bill
     Bill bill = new Bill();

     bill.setOrder(savedOrder);
     bill.setUser(user);
     bill.setShop(shop);
     bill.setTotalPrice(total);

     billRepository.save(bill);

     return mapToResponse(savedOrder);
    }
    @Override
    public OrderResponse getOrderById(Long orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Order not found"));

        return mapToResponse(order);
    }

    @Override
    public List<OrderResponse> getMyOrders(String phone) {

        User user = userRepository.findByPhone(phone)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        return orderRepository.findByUserUserId(user.getUserId())
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<OrderResponse> getOrdersByShop(Long shopId) {

        return orderRepository.findByShopShopId(shopId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<OrderResponse> getOrdersByStatus(OrderStatus status) {

        return orderRepository.findByOrderStatus(status)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public OrderResponse updateOrderStatus(Long orderId,
                                           OrderStatus status) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Order not found"));

        order.setOrderStatus(status);

        return mapToResponse(orderRepository.save(order));
    }
    private OrderResponse mapToResponse(Order order) {

        List<OrderItemResponse> itemResponses =
                order.getOrderItems()
                        .stream()
                        .map(this::mapItemResponse)
                        .toList();

        return new OrderResponse(

                order.getOrderId(),

                order.getUser().getUserId(),
                order.getUser().getName(),

                order.getShop().getShopId(),
                order.getShop().getShopName(),

                order.getTotalPrice(),

                order.getOrderStatus(),

                order.getCreatedAt(),

                itemResponses
        );
    }

    private OrderItemResponse mapItemResponse(OrderItem item) {

        BigDecimal subTotal =
                item.getPrice().multiply(
                        BigDecimal.valueOf(item.getQuantity()));

        return new OrderItemResponse(

                item.getProduct().getProductId(),

                item.getProduct().getProductName(),

                item.getQuantity(),

                item.getPrice(),

                subTotal
        );
    }

}
    