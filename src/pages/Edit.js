import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
    const [originData, setOriginData] = useState();
    const navigate = useNavigate();
    const { id } = useParams();

    const diaryList = useContext(DiaryStateContext);

    useEffect(() => {
        if (diaryList.length >= 1) {
            const targetDiary = diaryList.find((it) => it.id === parseInt(id));

            if (targetDiary) {
                setOriginData(targetDiary);
            } else {
                navigate("/", { replace: true });
            }
        }
    }, [id, diaryList]);
    return originData ? (
        <DiaryEditor isEdit={true} originData={originData} />
    ) : (
        <></>
    );
};

export default Edit;
