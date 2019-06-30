package com.pilot.watchstore.bootstrap;

import com.pilot.watchstore.model.Category;
import com.pilot.watchstore.model.Customer;
import com.pilot.watchstore.model.Product;
import com.pilot.watchstore.repositories.CategoryRepository;
import com.pilot.watchstore.repositories.CustomerRepository;
import com.pilot.watchstore.repositories.ProductRepository;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class InitialData implements ApplicationListener<ContextRefreshedEvent> {

    private CategoryRepository categoryRepository;
    private ProductRepository productRepository;
    private CustomerRepository customerRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public InitialData(CategoryRepository categoryRepository, ProductRepository productRepository, CustomerRepository customerRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.customerRepository = customerRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }


    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {

        Customer admin = new Customer("Petar Petrovic","pe.petrovic994@gmail.com","+381606378529","admin","admin",true,"ADMIN");
        admin.setPassword(bCryptPasswordEncoder.encode(admin.getPassword()));
        Customer user = new Customer("Marko Markovic","marko.markovic@gmail.com","+38160111222","MareCar","12345678",true,"USER");
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));

        customerRepository.save(admin);
        customerRepository.save(user);

        Category menWatch = new Category("men-watches");
        Category womenWatch = new Category("women-watches");
        Category smartWatch = new Category("smart-watches");

        Product menwatch1 = new Product("Color: Silver,Movement: Quartz,Water resistancy: 50 meters,Strap Type: Metal bracelet","Mens STORM Darth Watch 47001/B",126.72,13,"https://d1rkccsb0jf1bk.cloudfront.net/products/99954370/main/medium/darth_black-1344527384-4027.jpg");
        menwatch1.getCategories().add(menWatch);
        Product menwatch2 = new Product("Color: Black,Movement: Quartz,Water resistancy: 50 meters,Strap Type: Metal bracelet","Armani Exchange Watch AX2104",133.70,4);
        menwatch2.getCategories().add(menWatch);
        Product menwatch3 = new Product("Color: Blue,Movement: Quartz,Water resistancy: 100 meters,Strap Type: Metal bracelet","Chronograph Watch EFV-520DB-2AVUEF",116.26,12);
        menwatch3.getCategories().add(menWatch);
        Product menwatch4 = new Product("Color: Black,Movement: Quartz,Water resistancy: 30 metres,Strap Type: Metal bracelet","HUGO Dare Watch 1530040",184.85,4);
        menwatch4.getCategories().add(menWatch);
        Product menwatch5 = new Product("Color: Black,Movement: Quartz,Water resistancy: 200 metres,Strap Type: Rubber","Casio G-Shock Gorillaz Remix Chronograph Watch DW-5600HRGRZ-1ER",79.50,7);
        menwatch5.getCategories().add(menWatch);
        Product menwatch6 = new Product("Color: LCD,Movement: Tough solar,Water resistancy: 200 metres,Strap Type: Silver","Casio G-Shock Full Metal Limited Edition Bluetooth",523.17,3);
        menwatch6.getCategories().add(menWatch);
        Product menwatch7 = new Product("Color: Silver,Movement: Quartz,Water resistancy: 30 metres,Strap Type: Silver","Mens Jack Wills Acland Watch JW003SLBR",127.89,8);
        menwatch7.getCategories().add(menWatch);
        Product menwatch8 = new Product("Color: Black,Movement: Quartz,Water resistancy: 300 metres,Strap Type: Metal bracelet","Bulova Watch 98D149",673.15,15);
        menwatch8.getCategories().add(menWatch);
        Product menwatch9 = new Product("Color: Blue,Movement: Quartz,Water resistancy: 200 metres,Strap Type: Metal bracelet","Jean Paul Gaultier Enfants Terribles Unisex Watch",104.63,6);
        menwatch9.getCategories().add(menWatch);
        Product menwatch10 = new Product("Color: Black,Movement: Eco-drive,Water resistancy: 200 metres,Strap Type: Leather","Mens Citizen Promaster Bullhead Alarm Chronograph Watch AV0078-04X",808.01,2);
        menwatch10.getCategories().add(menWatch);


        Product womenwatch1 = new Product("Color: White,Movement: Quartz,Water resistancy: 10 metres,Strap Type: Metal bracelet","White Dial Rose Gold Mesh Watch",113.93,11);
        womenwatch1.getCategories().add(womenWatch);
        Product womenwatch2 = new Product("Color: White,Movement: Quartz,Water resistancy: 50 metres,Strap Type: Rubber","Ladies Guess Jet Setter Watch W0564L1",173.23,4);
        womenwatch2.getCategories().add(womenWatch);
        Product womenwatch3 = new Product("Color: Blue,Movement: Quartz,Water resistancy: 20 metres,Strap Type: Leather","HUGO Watch 1530069",184.85,10);
        womenwatch3.getCategories().add(womenWatch);
        Product womenwatch4 = new Product("Color: Grey,Movement: Quartz,Water resistancy: 30 metres,Strap Type: Metal bracelet","HUGO Exist Watch 1520012",184.85,15);
        womenwatch4.getCategories().add(womenWatch);
        Product womenwatch5 = new Product("Color: Rose,Movement: Quartz,Water resistancy: 250 metres,Strap Type: Leather","Sunray Rose Gold & Tan Watch",76.27,2);
        womenwatch5.getCategories().add(womenWatch);
        Product womenwatch6 = new Product("Color: Rose,Movement: Quartz,Water resistancy: 250 metres,Strap Type: Leather","Ladies Jack Wills Bennett Watch JW005BLRG",104.63,12);
        womenwatch6.getCategories().add(womenWatch);
        Product womenwatch7 = new Product("Color: White,Movement: Quartz,Water resistancy: No,Strap Type: PU Leather","Pretty Blossom Demi Vegan Grey & Rg Watch",95.33,6);
        womenwatch7.getCategories().add(womenWatch);
        Product womenwatch8 = new Product("Color: Black,Movement: Quartz,Water resistancy: 30 metres,Strap Type: PU Leather","Coach Watch 14503091",174.39,2);
        womenwatch8.getCategories().add(womenWatch);
        Product womenwatch9 = new Product("Color: Multicolour,Movement: Quartz,Water resistancy: 10 metres,Strap Type: Leather","Jean Paul Gaultier Bad Girl Ladies Watch",184.85,7);
        womenwatch9.getCategories().add(womenWatch);
        Product womenwatch10 = new Product("Color: Gold,Movement: Quartz,Water resistancy: 70 metres,Strap Type: Leather","Signature Florals Black & Rose Gold Watch",95.33,15);
        womenwatch10.getCategories().add(womenWatch);

        Product womenwatch11 = new Product("Color: Gold,Movement: Quartz,Water resistancy: 70 metres,Strap Type: Leather","Signature Florals Rose & Rose Gold Watch",95.33,15);
        womenwatch10.getCategories().add(womenWatch);


        Product smartwatch1 = new Product("Color: Black,Movement: Digital,Water resistancy: No,Strap Type: Metal bracelet","Gents Emporio Armani Connected Bluetooth WearOS Smartwatch ART5003",277.86,3);
        smartwatch1.getCategories().add(smartWatch);
        smartwatch1.getCategories().add(menWatch);
        Product smartwatch2 = new Product("Color: Black,Movement: Digital,Water resistancy: No,Strap Type: Metal bracelet","Casio G-Shock Bluetooth Step Tracker Watch GBA-800-9AER",356.86,9);
        smartwatch2.getCategories().add(smartWatch);
        smartwatch2.getCategories().add(menWatch);
        Product smartwatch3 = new Product("Color: Black,Movement: Digital,Water resistancy: No,Strap Type: Metal bracelet","Garmin Fenix 5S Plus GPS Smartwatch 010-01987-23",1277.72,3);
        smartwatch3.getCategories().add(smartWatch);
        smartwatch3.getCategories().add(womenWatch);
        Product smartwatch4 = new Product("Color: Black,Movement: Digital,Water resistancy: No,Strap Type: Metal bracelet","Casio G-Shock Gravitymaster Bluetooth Watch GR-B100-1A3ER",654.32,12);
        smartwatch4.getCategories().add(smartWatch);
        smartwatch4.getCategories().add(menWatch);
        Product smartwatch5 = new Product("Color: Black,Movement: Digital,Water resistancy: No,Strap Type: Metal bracelet","Unisex Swatch Petrozero2 Bluetooth Alarm Chronograph Watch SVQB100",722.12,3);
        smartwatch5.getCategories().add(smartWatch);
        smartwatch5.getCategories().add(menWatch);
        smartwatch5.getCategories().add(womenWatch);
        Product smartwatch6 = new Product("Color: Black,Movement: Digital,Water resistancy: No,Strap Type: Metal bracelet","Fossil Watch FTW1122",543.46,5);
        smartwatch6.getCategories().add(smartWatch);
        smartwatch6.getCategories().add(womenWatch);
        Product smartwatch7 = new Product("Color: Black,Movement: Digital,Water resistancy: No,Strap Type: Metal bracelet","Mens Nixon The Mission Android Wear Bluetooth Smart Alarm Chronograph Watch A1167-2658",1266.86,8);
        smartwatch7.getCategories().add(smartWatch);
        smartwatch7.getCategories().add(menWatch);
        smartwatch7.getCategories().add(womenWatch);
        Product smartwatch8 = new Product("Color: Black,Movement: Digital,Water resistancy: No,Strap Type: Metal bracelet","Mens Hugo Boss Boss Touch Bluetooth Android Wear Watch 1513551",987.26,12);
        smartwatch8.getCategories().add(smartWatch);
        smartwatch8.getCategories().add(menWatch);
        Product smartwatch9 = new Product("Color: Black,Movement: Digital,Water resistancy: No,Strap Type: Metal bracelet","Casio G-Shock Bluetooth Watch GW-B5600-2ER",566.36,6);
        smartwatch9.getCategories().add(smartWatch);
        smartwatch9.getCategories().add(menWatch);
        Product smartwatch10 = new Product("Color: Black,Movement: Digital,Water resistancy: No,Strap Type: Metal bracelet","Unisex Suunto Ambit2 Bluetooth Silver Alarm Chronograph Watch SS019650000",477.56,15);
        smartwatch10.getCategories().add(smartWatch);
        smartwatch10.getCategories().add(menWatch);
        smartwatch10.getCategories().add(womenWatch);

        categoryRepository.save(menWatch);
        categoryRepository.save(womenWatch);
        categoryRepository.save(smartWatch);

        productRepository.save(menwatch1);
        productRepository.save(menwatch2);
        productRepository.save(menwatch3);
        productRepository.save(menwatch4);
        productRepository.save(menwatch5);
        productRepository.save(menwatch6);
        productRepository.save(menwatch7);
        productRepository.save(menwatch8);
        productRepository.save(menwatch9);
        productRepository.save(menwatch10);
        productRepository.save(womenwatch1);
        productRepository.save(womenwatch2);
        productRepository.save(womenwatch3);
        productRepository.save(womenwatch4);
        productRepository.save(womenwatch5);
        productRepository.save(womenwatch6);
        productRepository.save(womenwatch7);
        productRepository.save(womenwatch8);
        productRepository.save(womenwatch9);
        productRepository.save(womenwatch10);
        productRepository.save(womenwatch11);
        productRepository.save(smartwatch1);
        productRepository.save(smartwatch2);
        productRepository.save(smartwatch3);
        productRepository.save(smartwatch4);
        productRepository.save(smartwatch5);
        productRepository.save(smartwatch6);
        productRepository.save(smartwatch7);
        productRepository.save(smartwatch8);
        productRepository.save(smartwatch9);
        productRepository.save(smartwatch10);

    }
}
