const EmotionItem = ({
    emotion_id,
    emotion_img,
    emotion_description,
    handleEmotion,
    isSelected,
}) => {
    return (
        <div
            className={[
                "EmotionItem",
                isSelected ? `EmotionItem_on_${emotion_id}` : "EmotionItem_off",
            ].join(" ")}
            onClick={() => handleEmotion(emotion_id)}
        >
            <img src={emotion_img} />
            <span>{emotion_description}</span>
        </div>
    );
};

export default EmotionItem;
