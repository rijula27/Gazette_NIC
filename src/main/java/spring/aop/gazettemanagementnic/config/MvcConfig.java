package spring.aop.gazettemanagementnic.config;



import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {

    public void addViewControllers(ViewControllerRegistry registry) {

//        registry.addViewController("/").setViewName("login");
        registry.addViewController("/login").setViewName("login");
        registry.addViewController("/home").setViewName("home");
        registry.addViewController("/style").setViewName("style");
        registry.addViewController("/logout").setViewName("logout");

        registry.addViewController("/creator").setViewName("creator/creator");
        registry.addViewController("/creator_dashboard").setViewName("creator/creator_dashboard");
        registry.addViewController("/creator_template").setViewName("creator/creator_template");
        registry.addViewController("/creator_submission_history").setViewName("creator/creator_submission_history");
        registry.addViewController("/creator_tender").setViewName("creator/creator_tender");
        registry.addViewController("/creator_tender_dashboard").setViewName("creator/creator_tender_dashboard");
        registry.addViewController("/creator_tender_submission_history").setViewName("creator/creator_tender_submission_history");

        registry.addViewController("/publisher").setViewName("publisher/publisher");
        registry.addViewController("/publisher").setViewName("publisher/publisher_template");
        registry.addViewController("/publisher_submission_history").setViewName("publisher/publisher_submission_history");
        registry.addViewController("/publisher_tender").setViewName("publisher/publisher_tender");
        registry.addViewController("/publisher_tender_submission_history").setViewName("publisher/publisher_tender_submission_history");

        
        registry.addViewController("/admin").setViewName("admin/admin");
        registry.addViewController("/admin_template").setViewName("admin/admin_template");
        registry.addViewController("/admin_creator_list").setViewName("admin/admin_creator_list");
        registry.addViewController("/admin_tender").setViewName("admin/admin_tender");


        registry.addViewController("/test").setViewName("test");








    }


}