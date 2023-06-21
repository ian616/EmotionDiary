import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";
import { DiaryDispatchContext } from "../App";

import emotion1 from "./../assets/emotion1.png";
import emotion2 from "./../assets/emotion2.png";
import emotion3 from "./../assets/emotion3.png";
import emotion4 from "./../assets/emotion4.png";
import emotion5 from "./../assets/emotion5.png";

const emotionList = [
    {
        emotion_id: 1,
        emotion_img: emotion1,
        emotion_description: "완전 좋음",
    },
    {
        emotion_id: 2,
        emotion_img: emotion2,
        emotion_description: "좋음",
    },
    {
        emotion_id: 3,
        emotion_img: emotion3,
        emotion_description: "그럭저럭",
    },
    {
        emotion_id: 4,
        emotion_img: emotion4,
        emotion_description: "나쁨",
    },
    {
        emotion_id: 5,
        emotion_img: emotion5,
        emotion_description: "끔찍함",
    },
];

const getStrDate = (date) => {
    return date.toISOString().slice(0, 10);
};

const DiaryEditor = ({ isEdit, originData }) => {
    const contentRef = useRef();
    const [content, setContent] = useState("");
    const [emotion, setEmotion] = useState(3);
    const [date, setDate] = useState(getStrDate(new Date()));

    const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (content.length < 1) {
            contentRef.current.focus();
            return;
        }
        isEdit
            ? onEdit(originData.id, date, content, emotion)
            : onCreate(date, content, emotion);
        navigate("/", { replace: true });
    };

    const handleDelete = () => {
        onRemove(originData.id);
        navigate("/", { replace: true });
    };

    useEffect(() => {
        if (isEdit) {
            setDate(getStrDate(new Date(parseInt(originData.date))));
            setEmotion(originData.emotion);
            setContent(originData.content);
        }
    }, [isEdit, originData]);

    return (
        <div className="DiaryEditor">
            <MyHeader
                headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
                leftChild={
                    <MyButton
                        text={"< 뒤로가기"}
                        onClick={() => {
                            navigate(-1);
                        }}
                    />
                }
                rightChild={
                    isEdit && (
                        <MyButton
                            text={"삭제하기"}
                            type="negative"
                            onClick={handleDelete}
                        />
                    )
                }
            />
            <div>
                <section>
                    <h4>오늘은 언제인가요?</h4>
                    <div className="input_box">
                        <input
                            className="input_date"
                            type={"date"}
                            value={date}
                            onChange={(e) => {
                                setDate(e.target.value);
                            }}
                        />
                    </div>
                </section>
                <section>
                    <h4>오늘의 감정</h4>
                    <div className="input_box emotion_list_wrapper">
                        {emotionList.map((it) => (
                            <EmotionItem
                                key={it.emotion_id}
                                {...it}
                                handleEmotion={(emotion) => {
                                    setEmotion(emotion);
                                }}
                                isSelected={it.emotion_id === emotion}
                            />
                        ))}
                    </div>
                </section>
                <section>
                    <h4>오늘의 일기</h4>
                    <div className="input_box text_wrapper">
                        <textarea
                            placeholder="오늘은 어땠나요?"
                            ref={contentRef}
                            value={content}
                            onChange={(e) => {
                                setContent(e.target.value);
                            }}
                        />
                    </div>
                </section>
                <section>
                    <div className="control_box">
                        <MyButton
                            text={"취소하기"}
                            onClick={() => {
                                navigate(-1);
                            }}
                        />
                        <MyButton
                            text={"저장하기"}
                            type={"positive"}
                            onClick={handleSubmit}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DiaryEditor;
