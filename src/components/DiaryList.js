import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";
import MyButton from "./MyButton";

const ControlMenu = ({ value, onChange, optionList }) => {
    return (
        <select
            className="ControlMenu"
            value={value}
            onChange={(e) => {
                onChange(e.target.value);
            }}
        >
            {optionList.map((it, idx) => (
                <option key={idx} value={it.value}>
                    {it.name}
                </option>
            ))}
            ;
        </select>
    );
};

const DiaryList = ({ items }) => {
    const sortOptionList = [
        { value: "latest", name: "최신순" },
        { value: "oldest", name: "오래된순" },
    ];
    const filterOptionList = [
        { value: "all", name: "모두" },
        { value: "good", name: "좋은 감정만" },
        { value: "bad", name: "안좋은 감정만" },
    ];

    const navigate = useNavigate();
    const [sortType, setSortType] = useState("latest");
    const [filterType, setFilterType] = useState("all");

    const getProcessedDiaryList = () => {
        const filter = (item) => {
            switch (filterType) {
                case "all": {
                    return true;
                }
                case "good": {
                    return parseInt(item.emotion) <= 3;
                }
                case "bad": {
                    return parseInt(item.emotion) > 3;
                }
                default:
                    return true;
            }
        };

        const compare = (a, b) => {
            if (sortType === "latest") {
                return parseInt(b.date) - parseInt(a.date);
            } else {
                return parseInt(a.date) - parseInt(b.date);
            }
        };

        const copyList = JSON.parse(JSON.stringify(items)); // deep copy of items
        const filteredList = copyList.filter((it) => filter(it));
        const sortedList = filteredList.sort(compare);
        return sortedList;
    };

    return (
        <div className="DiaryList">
            <div className="menu_wrapper">
                <div className="left_col">
                    <ControlMenu
                        value={sortType}
                        onChange={setSortType}
                        optionList={sortOptionList}
                    />
                    <ControlMenu
                        value={filterType}
                        onChange={setFilterType}
                        optionList={filterOptionList}
                    />
                </div>
                <div className="right_col">
                    <MyButton
                        type={"positive"}
                        text={"새 일기 쓰기 ✏️"}
                        onClick={() => {
                            navigate("/new");
                        }}
                    />
                </div>
            </div>

            {getProcessedDiaryList().map((it) => (
                <DiaryItem key={it.id} {...it} />
            ))}
        </div>
    );
};

DiaryList.defaultProps = {
    items: [],
};

export default DiaryList;
