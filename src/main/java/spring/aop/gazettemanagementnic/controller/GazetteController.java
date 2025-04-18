package spring.aop.gazettemanagementnic.controller;

import jakarta.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import spring.aop.gazettemanagementnic.service.GazetteService;

import java.io.IOException;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.format.annotation.DateTimeFormat;




@Controller
@RequestMapping("/gazette")
public class GazetteController {

    @Autowired
    private GazetteService gazetteService;


    @PostMapping("/upload")
    public String uploadGazette(@RequestParam("gazettePart") String part,
                                @RequestParam("pdfFile") MultipartFile file,
                                @RequestParam("date") LocalDate date,
                                HttpSession session,
                                RedirectAttributes redirectAttributes) {
        String username = (String) session.getAttribute("loggedInUser");
                                
        if (username == null) {
            return "redirect:/login";
        }

        try {

            final long MAX_SIZE = 10 * 1024 * 1024; // 10MB

            if (file.getSize() > MAX_SIZE) {

                return "redirect:/creator"; // Redirect with error message
            }

            gazetteService.saveGazette(part, file, date, username);

            // Redirect with success message
            redirectAttributes.addAttribute("success", "Gazette saved successfully!");
            return "redirect:/creator";

        } catch (IOException e) {
            redirectAttributes.addAttribute("error", "Error uploading file: " + e.getMessage());
            return "redirect:/creator";
        }
    }





    @PostMapping("/edit")
    public ResponseEntity<String> editGazette(
            @RequestParam("gazetteId") Long id,
            @RequestParam("part") String part,
            @RequestParam(value = "pdfFile", required = false) MultipartFile file,
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            HttpSession session) {

        String username = (String) session.getAttribute("loggedInUser");

        if (username == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("{\"error\": \"User not authorized.\"}");
        }

        try {
            // Validate file if it's not null
            if (file != null && !file.isEmpty()) {
                final long MAX_SIZE = 10 * 1024 * 1024; // 10MB
                if (file.getSize() > MAX_SIZE) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body("{\"error\": \"File size exceeds 10MB limit.\"}");
                }
            }

            gazetteService.updateGazette(id, part, file, username, date);
            return ResponseEntity.ok("{\"message\": \"Gazette updated successfully!\"}");

        } catch (Exception e) {
            // return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            //         .body(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body( e.getMessage());
        }
    }





  //view pdf
    @GetMapping("/pdf/{id}")
    public ResponseEntity<?> viewGazettePdf(@PathVariable Long id, HttpSession session) throws IOException {
        String username = (String) session.getAttribute("loggedInUser");

        if (username != null) {
            return gazetteService.getGazettePdfResponse(id);
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("{\"error\": \"User not authorized.\"}");
        }
    }
    

}
