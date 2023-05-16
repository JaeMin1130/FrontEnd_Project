import style from "./design.module.css"
import { useEffect, useState } from "react"
const Picture = function ({ pictureArr, text, setPictureArr, setLoading, fetchData }) {
    // 클릭된 키워드 
    const [clickedKey, setClickedKey] = useState("")

    // 태그 생성 함수
    const prodTag = function (item, idx) {
        // 키워드 6개만 표시
        let keyword = item.galSearchKeyword.split(",").sort()
            .map((item) => item).filter((item, idx) => (idx < 6));
        return (
            <article key={idx} className={style.photoArticle}>
                <header className={style.photoHeader}>
                    <hgroup className={style.photoHgroup}>
                        <h2>{item.galTitle}</h2><h6>{item.galPhotographyLocation}</h6>
                    </hgroup>
                </header>
                <img src={item.galWebImageUrl} alt="" />

                {keyword.map((item) =>
                    <div className={style.keyword} onClick={() => setClickedKey(item.replace(/[ㅊ?]/g, ""))}>
                        {item.replace(/[ㅊ?]/g, "")}{/* 오탈자 제거 */}
                    </div>
                )}
            </article>)
    }

    let evenTag = []
    let oddTag = []
    let spareTag

    // 짝수개면 두 개씩 출력
    if (pictureArr.length % 2 == 0) {
        pictureArr.map((item, idx) => (idx % 2 != 0) ? oddTag.push(prodTag(item, idx)) : evenTag.push(prodTag(item, idx)))

    // 홀수개면 남은 하나 따로 출력
    } else {
        pictureArr.map((item, idx) => {
            if (idx < pictureArr.length - 1) {
                (idx % 2 != 0) ? oddTag.push(prodTag(item, idx)) : evenTag.push(prodTag(item, idx))
            }
        })
        spareTag = prodTag(pictureArr[pictureArr.length - 1], pictureArr.length - 1)
    }

    // keyword 클릭하면 바로 검색
    const search = function () {
        setPictureArr([]) // 기존 검색 결과 없애기
        let encodedText = encodeURI(clickedKey)
        let url = `https://apis.data.go.kr/B551011/PhotoGalleryService1/gallerySearchList1?serviceKey=pwxPD7SvaQhz8AtCIjk2pem2kA4vkXCY5n4RIlREYOy1syfPerNWQQ09wWOQehCXOrObm74%2BO04%2BSTm04ksrzg%3D%3D&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&arrange=A&keyword=${encodedText}&_type=json`
        fetchData(url)
        text.current.value = clickedKey
        text.current.focus()
    }
    useEffect(() => { search(); setLoading(true) }, [clickedKey])

    return (
        <footer className="container">
            <div className="grid">
                <div>{oddTag}</div>
                <div>{evenTag}</div>
            </div>
            <div>{spareTag}</div>
        </footer>
    )
}
export default Picture