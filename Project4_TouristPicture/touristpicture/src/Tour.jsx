import Picture from "./Picture"
import style from "./design.module.css"
import { useState, useEffect, useRef } from "react"

const Tour = function () {

    const text = useRef("")
    const [pictureArr, setPictureArr] = useState([])
    useEffect(() => {
        text.current.focus()
    }, [])

    // fetch 함수
    const fetchData = (url) => {
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                if (data && data.response && data.response.body && data.response.body.items && data.response.body.items.item) {
                    let arr = data.response.body.items.item;
                    setPictureArr(arr);
                }else{
                    if(text.current.value != ""){
                    text.current.value = "입력한 키워드에 대한 사진이 존재하지 않습니다."
                    }
                }
            })
            .catch((err) => console.log(err))
            }

    // show 함수
    const show = function (e) {
        e.preventDefault()
        let encodedText = encodeURI(text.current.value)
        let url = `https://apis.data.go.kr/B551011/PhotoGalleryService1/gallerySearchList1?serviceKey=pwxPD7SvaQhz8AtCIjk2pem2kA4vkXCY5n4RIlREYOy1syfPerNWQQ09wWOQehCXOrObm74%2BO04%2BSTm04ksrzg%3D%3D&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&arrange=A&keyword=${encodedText}&_type=json`
        fetchData(url)
    }

    // clear 함수
    const clear = (e) => {
        e.preventDefault()
        setPictureArr([])
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
                </header>
            </article>
            <Picture pictureArr={pictureArr} text={text} fetchData = {fetchData} />
        </main>
    )
}
export default Tour