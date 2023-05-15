import { useState, useEffect } from "react"

const BoxRows = function ({ mv }) {
    let trList = []
    let imoji = ""

    for (let item of mv) {
        if (item.rankInten > 0) {
            imoji = "🔼 " + Math.abs(item.rankInten)
        } else if (item.rankInten < 0) {
            imoji = "🔽 " + Math.abs(item.rankInten)
        } else {
            imoji = ""
        }

        trList.push(
            <tr className="tr" key={item.movieCd} onClick={() => showMv(item)}>
                <td className="rank">{item.rank}위</td>
                <td className="name">{item.movieNm}</td>
                <td className="sales">{parseInt(item.salesAmt).toLocaleString()}원</td>
                <td className="increase">{imoji}</td>
            </tr>)
    }
    const [foot, setfoot] = useState("")
    function showMv(props) {
        setfoot(
            <div>
                "{props.movieNm}"&nbsp;&nbsp;&nbsp;
                개봉일 : {props.openDt}&nbsp;&nbsp;&nbsp;
                누적관객수 : {parseInt(props.audiAcc).toLocaleString()}명
            </div>
        )
    }
    useEffect(() => { setfoot() }, [mv])

    return (
        <>
            <tbody>
                {trList}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={3}>{foot}</td>
                    <td><a href="https://www.cgv.co.kr/ticket/"> 예매하러 가기</a></td>
                </tr>
            </tfoot>
        </>
    )

}
export default BoxRows