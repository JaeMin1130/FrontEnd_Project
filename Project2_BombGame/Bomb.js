document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll(".box div")
    const button = document.querySelector("#button") 

    let arr = [0, 0, 0, 0, 0, 0, 0, 0, 1]
    let flag = true
    let count = 0
    let sum = 45;

    for (const box of boxes) {
        // 박스에 번호 넣기
        box.innerHTML = box.getAttribute('id').replace('no', '')
    }

    // 폭탄섞기
    button.addEventListener("click", () => {
        if (flag) {
            arr.sort(() => Math.random() - 0.5);
            flag = false
            for (const box of boxes) {
                // 박스에 번호 넣기
                box.innerHTML = box.getAttribute('id').replace('no', '')
            }
            count = 0
            sum = 45
            document.querySelector("h2").innerHTML = ""
        }
    })

    for (let box of boxes) {

        box.addEventListener("click", () => {
            let n = box.textContent
        if(flag){
            document.querySelector("h2").innerHTML = "폭탄을 섞어주세요."
        }
        if(!flag){
            if (arr[n - 1] == 0) {
                box.innerHTML = '<img src = "./img/hart.png">'
                count++
                sum -= n
                if(count == 8){
                document.querySelector("h2").innerHTML = "성공"
                boxes[sum-1].innerHTML = '<img src = "./img/boom.png">'
                flag = true
                }
            } else if (arr[n - 1] == 1) {
                box.innerHTML = '<img src = "./img/boom.png">'
                flag = true
                document.querySelector("h2").innerHTML = "실패"
            }
        }
        })
    }
})