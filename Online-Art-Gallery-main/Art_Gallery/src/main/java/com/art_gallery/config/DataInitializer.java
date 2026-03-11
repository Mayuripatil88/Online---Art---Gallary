//package com.art_gallery.config;
//
//import com.art_gallery.entity.User;
//import com.art_gallery.repository.UserRepository;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.stereotype.Component;
//import org.springframework.transaction.annotation.Transactional;
//
//@Component
//public class DataInitializer implements CommandLineRunner {
//
//    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);
//
//    private final UserRepository userRepository;
//
//    public DataInitializer(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }
//
//    @Override
//    @Transactional
//    public void run(String... args) {
//        createDefaultUserIfMissing("admin@gallery.com", "admin@123", User.Role.admin);
//    }
//
//    private void createDefaultUserIfMissing(String email, String password, User.Role role) {
//        userRepository.findByEmail(email).ifPresentOrElse(existing -> {
//            boolean needsUpdate = false;
//            if (!password.equals(existing.getPassword())) {
//                existing.setPassword(password);
//                needsUpdate = true;
//            }
//            if (existing.getRole() != role) {
//                existing.setRole(role);
//                needsUpdate = true;
//            }
//            if (needsUpdate) {
//                userRepository.save(existing);
//                log.info("Updated default {} account: {}", role.name(), email);
//            } else {
//                log.info("Default {} account already up to date: {}", role.name(), email);
//            }
//        }, () -> {
//            User user = new User();
//            user.setName(role == User.Role.admin ? "Default Admin" : "Demo User");
//            user.setEmail(email);
//            user.setPassword(password);
//            user.setRole(role);
//            userRepository.save(user);
//            log.info("Created default {} account: {}", role.name(), email);
//        });
//    }
//}
//
