import Picture from "./Picture"
import Loading from "./Loading"
import style from "./design.module.css"
import { useState, useEffect, useRef } from "react"

const Tour = function () {

    const text = useRef()
    const [pictureArr, setPictureArr] = useState([])
    const [loading, setLoading] = useState(false) 
    // 사진이 없을 때
    const[noDataTag, setNoDataTag] = useState()
    
    useEffect(() => {
        text.current.focus()
        setLoading(false) // 첫 렌더링에 안 나오게 하기
    }, [])
    // fetch 함수
    const fetchData = (url) => {
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                if (data && data.response && data.response.body && data.response.body.items && data.response.body.items.item) {
                    let arr = data.response.body.items.item;
                    setPictureArr(arr);
                } else {
                    if (text.current.value != "") {
                        setNoDataTag(<div>입력한 키워드에 대한 사진이 존재하지 않습니다.</div>)
                    }
                }
                setLoading(false)
            })
            .catch((err) => console.log(err))
    }

    // show 함수
    const show = function (e) {
        setPictureArr([]) // 기존 검색 결과 없애기
        setNoDataTag()    // 문구 없애기
        e.preventDefault()
        setLoading(true) // Loading
        let encodedText = encodeURI(text.current.value)
        let url = `https://apis.data.go.kr/B551011/PhotoGalleryService1/gallerySearchList1?serviceKey=pwxPD7SvaQhz8AtCIjk2pem2kA4vkXCY5n4RIlREYOy1syfPerNWQQ09wWOQehCXOrObm74%2BO04%2BSTm04ksrzg%3D%3D&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&arrange=A&keyword=${encodedText}&_type=json`
        fetchData(url)
    }

    // clear 함수
    const clear = (e) => {
        e.preventDefault()
        setPictureArr([])
        setNoDataTag()
        text.current.value = ""
        text.current.focus()
    }

    return (
        <main className="container">
            <article className={style.mainArticle}>
                <header>
                    <h3>한국관광공사 관광사진 정보</h3>
                    <div className="grid">
                        <input ref={text} type="text" id="txt1" name="txt1" placeholder="키워드를 입력하세요." />
                        <div className="grid">
                            <button className="contrast" onClick={(e) => show(e)}>검색</button>
                            <button className="contrast" onClick={(e) => clear(e)}>초기화</button>
                        </div>
                    </div>
                    {noDataTag}
                    {loading ? <Loading /> : null}
                </header>
            </article>
            <Picture pictureArr={pictureArr} text={text} setPictureArr={setPictureArr} setLoading={setLoading} fetchData={fetchData} />
        </main>
    )
}
export default Tour