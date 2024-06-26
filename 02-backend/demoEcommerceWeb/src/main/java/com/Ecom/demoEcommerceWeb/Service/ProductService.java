package com.Ecom.demoEcommerceWeb.Service;

import com.Ecom.demoEcommerceWeb.dao.CheckoutRepository;
import com.Ecom.demoEcommerceWeb.dao.HistoryRepository;
import com.Ecom.demoEcommerceWeb.dao.ProductRepository;
import com.Ecom.demoEcommerceWeb.entity.Checkout;
import com.Ecom.demoEcommerceWeb.entity.History;
import com.Ecom.demoEcommerceWeb.entity.Product;
import com.Ecom.demoEcommerceWeb.responsemodel.CartCurrentOrderResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@Transactional
public class ProductService {
    private ProductRepository productRepository;
    private CheckoutRepository checkoutRepository;
    private HistoryRepository historyRepository;
    public ProductService(ProductRepository productRepository,CheckoutRepository checkoutRepository,HistoryRepository historyRepository){
        this.productRepository = productRepository;
        this.checkoutRepository = checkoutRepository;
        this.historyRepository = historyRepository;
    }
    public Product checkoutProduct (String userEmail,Long productId) throws Exception{
        Optional<Product> product = productRepository.findById(productId);
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndProductId(userEmail,productId);
        if (!product.isPresent()|| validateCheckout != null || product.get().getQuantityAvailable() <= 0){
            throw new Exception("Product not available");
        }
        product.get().setQuantityAvailable(product.get().getQuantityAvailable()-1);
        productRepository.save(product.get());
        Checkout checkout = new Checkout(
                userEmail,
                LocalDate.now().toString(),
                LocalDate.now().plusDays(7).toString(),
                product.get().getId()
        );
        checkoutRepository.save(checkout);
        return product.get();
    }
    public Boolean checkoutProductByUser(String userEmail,Long productId){
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndProductId(userEmail, productId);
        if (validateCheckout != null){
            return true;
        }else{
            return false;
        }
    }
   public int currentCount (String userEmail){
        return checkoutRepository.findProductsByUserEmail(userEmail).size();
   }
   public List<CartCurrentOrderResponse> currentOrders(String userEmail) throws Exception{
        List<CartCurrentOrderResponse> cartCurrentOrderResponses = new ArrayList<>();
        List<Checkout> checkoutList = checkoutRepository.findProductsByUserEmail(userEmail);
        List<Long> productIdList = new ArrayList<>();
        for(Checkout i: checkoutList){
            productIdList.add(i.getProductId());
        }
        List<Product> products = productRepository.findProductsByProductIds(productIdList);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        for(Product product : products){
            Optional<Checkout> checkout = checkoutList.stream()
                    .filter(x -> x.getProductId() == product.getId()).findFirst();
            if(checkout.isPresent()){
                Date d1 = sdf.parse(checkout.get().getCheckoutDate());
                Date d2 = sdf.parse(LocalDate.now().toString());
                TimeUnit time = TimeUnit.DAYS;
                long diff_time = time.convert(d1.getTime() - d2.getTime(),
                        TimeUnit.MILLISECONDS);
                cartCurrentOrderResponses.add(new CartCurrentOrderResponse(product,(int) diff_time));
            }
        }
        return cartCurrentOrderResponses;
   }
   public void orderProduct (String userEmail,Long productId) throws Exception{
        Optional<Product> product = productRepository.findById(productId);
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndProductId(userEmail,productId);
        if(!product.isPresent()||validateCheckout == null){
            throw new Exception("Product does not exist !!");
        }
        product.get().setQuantityAvailable(product.get().getQuantityAvailable());
        productRepository.save(product.get());
        checkoutRepository.deleteById(validateCheckout.getId());
       History history = new History(
              userEmail,
              validateCheckout.getCheckoutDate(),
               LocalDate.now().toString(),
               product.get().getTitle(),
               product.get().getSeller(),
               product.get().getDescription(),
               product.get().getImg()
       );
       historyRepository.save(history);
   }
    public void removeProduct (String userEmail,Long productId) throws Exception{
        Optional<Product> product = productRepository.findById(productId);
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndProductId(userEmail,productId);
        if(!product.isPresent()||validateCheckout == null){
            throw new Exception("Product does not exist !!");
        }
       product.get().setQuantityAvailable(product.get().getQuantityAvailable()+1);
       productRepository.save(product.get());
       checkoutRepository.deleteById(validateCheckout.getId());
    }
}
