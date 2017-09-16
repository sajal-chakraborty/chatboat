package com.mkyong.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.mkyong.web.model.User;

@Controller
public class WelcomeController {

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String printWelcome(ModelMap model) {
		return "login2";
	}
	
	@RequestMapping(value = "/api/login", method = RequestMethod.POST)
	public String login(@RequestBody User user) {
		System.out.println("User : " + user);
		return "login";
	}
}
