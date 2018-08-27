var KoreanUtil = (function(){

    function getComleteWordByjongung(name, str1, str2){
        var char = name.charAt(name.length - 1);
        char = char.charCodeAt(0);
        // char = char.toString(16);
        // char = char.toUpperCase();
        
        // 한글의 제일 처음과 끝의 범위밖일 경우는 오류
        if(char < 0xAC00 || char > 0xD7A3){
            return console.error("유니코드(한글) 범위내의 문자가 아닙니다.");
        }
        
        var str = (char - 0xAC00) % 28 > 0 ? str1 : str2;

        return name + str;
    }

    return {
        getComleteWordByjongung: getComleteWordByjongung
    }
})();


var name = "ㄱ";


console.log(KoreanUtil.getComleteWordByjongung(name, "을", "를"));
console.log(KoreanUtil.getComleteWordByjongung(name, "이", "가"));
console.log(KoreanUtil.getComleteWordByjongung(name, "은", "는"));
