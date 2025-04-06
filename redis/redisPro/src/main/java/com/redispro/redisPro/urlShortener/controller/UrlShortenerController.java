package com.redispro.redisPro.urlShortener.controller;

import com.redispro.redisPro.urlShortener.service.UrlShortenerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequestMapping("/api/v1/url-shortener")
public class UrlShortenerController {

    @Autowired
    private UrlShortenerService urlShortenerService;

    @Value("${app.shortenUrl.api.baseurl}")
    private String baseUrl;

    // shorten url endpoint
    @PostMapping("/shorten")
    public ResponseEntity<String> shortenUrl(@RequestParam String url) {
        String shortUrl = urlShortenerService.shortenUrl(url);
        return ResponseEntity.ok(baseUrl + shortUrl);
    }

    // retrieve long url endpoint
    @GetMapping("/{shortUrl}")
    public RedirectView redirectToLongUrl(@PathVariable String shortUrl) {
        String longUrl = urlShortenerService.getLongUrl(shortUrl);
        if (longUrl != null) {
            urlShortenerService.incrementClickCount(shortUrl);
            return new RedirectView(longUrl);
        } else {
            return new RedirectView("/error");
        }
    }

    @GetMapping("/stats/{shortUrl}")
    public ResponseEntity<String> getUrlStats(@PathVariable String shortUrl) {
        Long clickCount = urlShortenerService.getClickCount(shortUrl);
        return ResponseEntity.ok("Click Count: " + clickCount);
    }
}
