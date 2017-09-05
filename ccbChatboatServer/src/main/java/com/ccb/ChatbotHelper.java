package com.ccb;

import java.io.IOException;

import org.alicebot.ab.Bot;
import org.alicebot.ab.Chat;
import org.alicebot.ab.History;
import org.alicebot.ab.MagicBooleans;
import org.alicebot.ab.MagicStrings;
import org.alicebot.ab.utils.IOUtils;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.core.io.Resource;

public class ChatbotHelper {
	private static final boolean TRACE_MODE = false;
	static ApplicationContext applicationContext = new ClassPathXmlApplicationContext("classpath:spring/context.xml");
	static String botName = "ccb";
	private static String action = "chat";
	private static boolean doWrites = true;
	
	static {
		setConfigurations();
	}

	public static void main(String[] args) {
		try {
			Bot bot = new Bot(botName, MagicStrings.root_path, action);
			Chat chatSession = new Chat(bot, doWrites);
			bot.brain.nodeStats();
			String textLine = "";
			for (;;) {
				textLine = IOUtils.readInputTextLine("Human");
				if ((textLine == null) || (textLine.length() < 1))
					textLine = MagicStrings.null_input;
				if (textLine.equals("q")) {
					System.exit(0);
				} else if (textLine.equals("wq")) {
					bot.writeQuit();
					System.exit(0);
				} else {
					String request = textLine;
					if (MagicBooleans.trace_mode)
						System.out.println("STATE=" + request + ":THAT=" + ((History) chatSession.thatHistory.get(0)).get(0) + ":TOPIC=" + chatSession.predicates.get("topic"));
					String response = chatSession.multisentenceRespond(request);
					while (response.contains("&lt;"))
						response = response.replace("&lt;", "<");
					while (response.contains("&gt;"))
						response = response.replace("&gt;", ">");
					IOUtils.writeOutputTextLine("Robot", response);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private static void setConfigurations() {
		MagicStrings.setRootPath(getBasePath());
		MagicBooleans.trace_mode = TRACE_MODE;
	}

	private static String getBasePath() {
		try {
			Resource resource = applicationContext.getResource("classpath:Readme.md");
			String resourcePath = resource.getFile().getParent();
			System.out.println("Base Path : " + resourcePath);
			return resourcePath;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

}
