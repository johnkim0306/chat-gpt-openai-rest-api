import { Injectable } from '@nestjs/common';
import { ChatHistoryManager } from './model/chat-history-manager';
import { ChatOpenAI } from "@langchain/openai";
import { GetChatCompletionAnswerInputDTO, GetChatCompletionAnswerOutputDTO } from './model/chat-completion-answer.dto';

const DEFAULT_TEMPERATURE = 1 
const DEFAULT_MODEL = "gpt-3.5-turbo"

@Injectable()
export class ChatCompletionApiService {
    private readonly chatHistory:ChatHistoryManager
    private readonly chat:ChatOpenAI

    constructor() {
        this.chatHistory = new ChatHistoryManager()
        this.chat = new ChatOpenAI({
            temperature:DEFAULT_TEMPERATURE,
            openAIApiKey:process.env.OPENAI_API_KEY,
            modelName:DEFAULT_MODEL,
        })
    }

    async getAiModelAnswer(data:GetChatCompletionAnswerInputDTO) {
        this.chatHistory.addHumanMessage(data.message)
        const result = await this.chat.predictMessages(
            this.chatHistory.chatHistory,
        );
        console.log(result)
        const aiMessage = result.content;
        console.log(aiMessage)


    }
}
