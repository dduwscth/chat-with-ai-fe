import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "../../component/Navbar.js";

function Chat() {

    const id = "hs-autoheight-textarea"; // Thay đổi ID theo ý bạn
    const offsetTop = 3; // Thay đổi offsetTop theo ý bạn
    const textareaRef = useRef(null);

    function textareaAutoHeight(el, offsetTop = 0) {
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight + offsetTop}px`;
    }

    const token = sessionStorage.getItem('token');
    const [chatHistory, setChatHistory] = useState(
        [
            {
                conversation_id: "",
                title: "",
                insert_at: "",
            }
        ]
    );

    const [question, setQuestion] = useState('');
    const [conversationId, setConversationId] = useState('');
    const [dataLoaded, setDataLoaded] = useState(false);

    const [geminiAi, setGeminiAi] = useState(
        [
            {
                conversation_id: "",
                order: "",
                question: "",
                response: "",
            }
        ]
    );

    const [chatGpt, setChatGpt] = useState(
        [
            {
                conversation_id: "",
                order: "",
                question: "",
                response: "",
            }
        ]
    );
    const handleEmptyChat = () => {
        setGeminiAi(
            [
                {
                    conversation_id: "",
                    role: "",
                    order: "",
                    question: "",
                    response: "",
                    answer: "",
                }
            ]
        );
        setChatGpt(
            [
                {
                    conversation_id: "",
                    role: "",
                    order: "",
                    question: "",
                    response: "",
                    answer: "",
                }
            ]
        );
        setDataLoaded(false);
    }


    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textareaAutoHeight(textarea, offsetTop);
            textarea.addEventListener('input', () => {
                textareaAutoHeight(textarea, offsetTop);
            });

            return () => {
                textarea.removeEventListener('input', () => {
                    textareaAutoHeight(textarea, offsetTop);
                });
            };
        }
    }, [offsetTop]);

    // Api call

    const handleStartChat = () => {
        console.log('start');
        axios.post('/api/chat/start',
            {
                conversation_id: "",
                question: question,
                is_gemini: true,
                is_chatgpt: true
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((response) => {
                setQuestion('');
                setConversationId(response.data.conversation_id);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleContinueChat = () => {
        if (conversationId) {
            console.log('continue');
            axios.post('/api/chat/continue',
                {
                    conversation_id: conversationId,
                    question: question,
                    is_gemini: true,
                    is_chatgpt: true
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then((response) => {
                    handleEmptyChat();
                    response.data.chat_history.gemini.chat_history.map((element, index) => {
                        setGeminiAi(prevState => [
                            ...prevState,
                            {
                                role: element.role,
                                order: element.order,
                                question: element.question,
                                response: element.response,
                                answer: element.answered,
                            }
                        ]);

                    });

                    response.data.chat_history.chatgpt.chat_history.map((element, index) => {
                        setChatGpt(prevState => [
                            ...prevState,
                            {
                                role: element.role,
                                order: element.order,
                                question: element.question,
                                response: element.response,
                                answer: element.answered,
                            }
                        ]);
                    });
                    setQuestion('');
                    setDataLoaded(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    const handleResendChat = () => {
        console.log('resend');
        axios.get(`/api/chat/resend?conversation_id=${conversationId ?? ''}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then((response) => {
                handleEmptyChat();
                response.data.chat_history.gemini.chat_history.map((element, index) => {
                    setGeminiAi(prevState => [
                        ...prevState,
                        {
                            role: element.role,
                            order: element.order,
                            question: element.question,
                            response: element.response,
                            answer: element.answered,
                        }
                    ]);

                });

                response.data.chat_history.chatgpt.chat_history.map((element, index) => {
                    setChatGpt(prevState => [
                        ...prevState,
                        {
                            role: element.role,
                            order: element.order,
                            question: element.question,
                            response: element.response,
                            answer: element.answered,
                        }
                    ]);
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleDeleteChat = (conversationId) => {
        console.log('delete');
        axios.delete(`/api/chat/delete?conversation_id=${conversationId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then((response) => {
                console.log('ok');
                handleEmptyChat();
                setConversationId('');
                setQuestion('');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        axios.get('/api/chat/histories',
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((response) => {
                const newChatHistory = response.data.map((item, index) => ({
                    ...chatHistory,
                    conversation_id: item.conversation_id,
                    insert_at: item.insert_at,
                    title: item.title,
                }));
                setChatHistory(newChatHistory);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [conversationId]);


    useEffect(() => {
        if (conversationId && !dataLoaded) {
            axios.get(`/api/chat/detail?conversation_id=${conversationId ?? ''}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then((response) => {
                    response.data.chat_history.gemini.chat_history.map((element, index) => {
                        setGeminiAi(prevState => [
                            ...prevState,
                            {
                                role: element.role,
                                order: element.order,
                                question: element.question,
                                response: element.response,
                                answer: element.answered,
                            }
                        ]);

                    });

                    response.data.chat_history.chatgpt.chat_history.map((element, index) => {
                        setChatGpt(prevState => [
                            ...prevState,
                            {
                                role: element.role,
                                order: element.order,
                                question: element.question,
                                response: element.response,
                                answer: element.answered,
                            }
                        ]);
                    });
                    setDataLoaded(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [conversationId, dataLoaded]);

    const handleQuestionChange = (e) => {
        setQuestion(e.target.value);
    }


    const handleHistoryClick = (conversation_id) => (e) => {
        handleEmptyChat();
        setConversationId(conversation_id);
        setDataLoaded(false);
    }

    const handleNewChat = () => {
        setConversationId('');
        setQuestion('');
        handleEmptyChat();
        setDataLoaded(false);
    }



    return (
        <div className="bg-[#161A30] max-h-screen h-screen p-2">
            <Navbar />
            <div className="h-full max-h-screen pt-[70px] w-full flex gap-2">
                <div className="w-2/12 border rounded-3xl p-2 flex flex-col gap-2 bg-[#B6BBC4]">
                    <button onClick={handleNewChat} className="w-full border rounded-full text-white bg-[#31304D] text-center py-2 hover:bg-[#161A30]">
                        Create a new chat...
                    </button>
                    <div className="border-b-2 border-[#31304D]"></div>
                    <div className="flex flex-col justify-between h-full">

                        <div className="overflow-y-scroll h-full max-h-[714px]">
                            {chatHistory.length > 0 ? chatHistory.map((item, index) => (
                                <div onClick={handleHistoryClick(item.conversation_id)} className="w-full border rounded-full text-white bg-white p-1 flex justify-between items-center mb-1 h-[46px]">
                                    <span className="w-9/12 text-gray-700 truncate text-sm">
                                        {item.title}
                                    </span>
                                    <button className="hidden w-3/12 border rounded-full bg-[#31304D] text-sm py-2 hover:bg-[#161A30]">
                                        Delete
                                    </button>
                                </div>
                            )) : null}
                        </div>
                        <div className="flex grap-2 p-2 justify-between">
                            <button className="  border rounded-full bg-[#31304D] text-sm py-2 px-9 hover:bg-[#161A30] text-white transition hover:scale-105">
                                Show more...
                            </button>
                            <button
                                onClick={() => handleDeleteChat("all")}
                                className="border rounded-full bg-[#820300] text-sm p-2 hover:bg-[#820300] text-white transition hover:scale-105">
                                Delete All
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-10/12 gap-2 flex flex-col max-h-screen">
                    <div className="w-full flex gap-2 h-full">
                        <div className="w-6/12 border rounded-3xl p-2 flex flex-col gap-2 bg-[#B6BBC4]">
                            <div className="w-full border-2 border-[#161A30] rounded-full flex items-center justify-between uppercase bg-white p-1">
                                <span className="text-gray-700 text-sm font-semibold">
                                    gemini pro
                                </span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-200 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#161A30]"></div>
                                </label>
                            </div>

                            <div className="max-h-[716px] h-full">
                                <div className="h-full overflow-y-scroll">
                                    {geminiAi.length > 1 && (
                                        geminiAi.map((item, index) => {
                                            if (item.response === "") {
                                                return null;
                                            } else {
                                                return (
                                                    <>
                                                        {item.question && (
                                                            <div className="chat chat-start">
                                                                <div className="chat-bubble">{item.question}</div>
                                                            </div>
                                                        )}
                                                        {item.response && (
                                                            <div className="chat chat-end">
                                                                <div className="chat-bubble">{item.response}</div>
                                                            </div>
                                                        )}
                                                    </>
                                                );
                                            }
                                        })
                                    )}

                                </div>
                            </div>


                        </div>

                        <div className="w-6/12 border rounded-3xl p-2 flex flex-col gap-2 bg-[#B6BBC4]">
                            <div className="w-full border-2 border-[#161A30] rounded-full flex items-center justify-between uppercase bg-white p-1">
                                <span className="text-gray-700 text-sm font-semibold">
                                    gemini pro
                                </span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-200 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#161A30]"></div>
                                </label>
                            </div>

                            <div className="max-h-[716px] h-full">
                                <div className="h-full overflow-y-scroll">
                                    {chatGpt.length > 1 && (
                                        chatGpt.map((item, index) => {
                                            if (item.response === "") {
                                                return null;
                                            } else {
                                                return (
                                                    <>
                                                        {item.question && (
                                                            <div className="chat chat-start">
                                                                <div className="chat-bubble">{item.question}</div>
                                                            </div>
                                                        )}
                                                        {item.answer === 0 && item.role === 'user' && (
                                                            <span onClick={handleResendChat}>
                                                                Restart
                                                            </span>
                                                        )}
                                                        {item.response && (
                                                            <div className="chat chat-end">
                                                                <div className="chat-bubble">{item.response}</div>
                                                            </div>
                                                        )}
                                                    </>
                                                );
                                            }
                                        })
                                    )}

                                </div>

                            </div>

                        </div>
                    </div>
                    <div className="flex items-center justify-between border rounded-2xl bg-[#B6BBC4] w-full p-1 h-auto z-10">
                        <textarea ref={textareaRef} id={id} className="py-3 px-4 bg-[#B6BBC4] block w-full text-gray-700 rounded-lg text-sm focus:border-0 focus:ring-transparent border-0 disabled:opacity-50 disabled:pointer-events-none max-h-[500px]"
                            rows="1" placeholder="Say hi..." onChange={handleQuestionChange} value={question}></textarea>
                        <button onClick={conversationId ? handleContinueChat : handleStartChat} className="bg-[#31304D] px-6 py-2 border rounded-full text-center text-white hover:bg-[#161A30]">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Chat;