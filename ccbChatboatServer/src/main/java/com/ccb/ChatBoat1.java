package com.ccb;

public class ChatBoat1 {

	public static void main(String[] args) {
		String request = "What is my balance";
		System.out.println(request);
		System.out.println(ChatbotHelper.getBotResponse(request));
		
		request = "What is my account type";
		System.out.println(request);
		System.out.println(ChatbotHelper.getBotResponse(request));
		
		request = "What is my account type";
		System.out.println(request);
		System.out.println(ChatbotHelper.getBotResponse(request));
	}

}
