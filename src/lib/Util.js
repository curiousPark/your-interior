
const style = [
        {id: 1, title: "모던", imgSrc: "/img/concierge/style1.jpg",    subTitle: "Mordern",    selected:false},
        {id: 2, title: "북유럽", imgSrc: "/img/concierge/style2.jpg", subTitle: "Northern European", selected:false},
        {id: 3, title: "클래식", imgSrc: "/img/concierge/style3.jpg",    subTitle: "Classic",    selected:false},
        {id: 4, title: "프로방스&로맨틱", imgSrc: "/img/concierge/style4.jpg",    subTitle: "Provence & Romantic", selected:false},
        {id: 5, title: "빈티지", imgSrc: "/img/concierge/style5.jpg", subTitle: "Vintage", selected:false},
        {id: 6, title: "한국&아시아", imgSrc: "/img/concierge/style6.jpg",    subTitle: "Korean & Asian",    selected:false},
        {id: 7, title: "미니멀리즘", imgSrc: "/img/concierge/style7.jpg",    subTitle: "Minimalism",    selected:false},
        {id: 8, title: "인더스트리얼", imgSrc: "/img/concierge/style8.jpg", subTitle: "Industrial", selected:false},
        {id: 10, title: "앤틱", imgSrc: "/img/concierge/style10.jpg",    subTitle: "Antique",    selected:false},
        {id: 11, title: "내추럴", imgSrc: "/img/concierge/style11.jpg", subTitle: "Natural", selected:false},
        {id: 9, title: "기타", imgSrc: "/img/concierge/style9.jpg",    subTitle: "etc.",    selected:false},
    ]
   
const spaces1 = [
    {id: 0, value: 1, title: "상업공간", imgSrc: "/img/concierge/Retail.jpg",    subTitle: "Store",    selected:false},
    {id: 2, value: 3, title: "주거공간", imgSrc: "/img/concierge/Residence.jpg", subTitle: "House", selected:false},
    {id: 1, value: 2, title: "사무공간", imgSrc: "/img/concierge/Office.jpg",    subTitle: "Office",    selected:false},
    // {id: 4, title: "부분시공", imgSrc: "/img/concierge/Remdeling.jpg", subTitle: "Remdeling", selected:false},
]

const spaces2 = [
    {id: 0,  value: 1, title: "요식/식당", subTitle: "Restaurant", selected:false, parentId: 0},
    {id: 1,  value: 2, title: "상업공간", subTitle: "Retail", selected:false, parentId: 0},
    {id: 2,  value: 3, title: "교육공간", subTitle: "Education", selected:false, parentId: 0},
    {id: 3,  value: 4, title: "의료공간", subTitle: "Hospital", selected:false, parentId: 0},
    {id: 4,  value: 5, title: "운동공간", subTitle: "Fitness", selected:false, parentId: 0},
    {id: 5,  value: 6, title: "숙박공간", subTitle: "Accommodations", selected:false, parentId: 0},
    {id: 6,  value: 7, title: "금융/중개", subTitle: "Finance/Estate", selected:false, parentId: 0},
    {id: 7,  value: 1, title: "사무공간", subTitle: "Office", selected:false, parentId: 1},
    {id: 8,  value: 2, title: "특수업무공간", subTitle: "Special-Purpose Office", selected:false, parentId: 1},
    {id: 9,  value: 1, title: "공동주택", subTitle: "Apartment", selected:false, parentId: 2},
    {id: 10, value: 2, title: "단독주택", subTitle: "House", selected:false, parentId: 2},

]

const spaces3 = [
    {  value: 1, parentId: 0, id: 0,   subTitle: "Café",  title: '카페', selected:false},                     
    {  value: 2, parentId: 0, id: 1,   subTitle: "Franchise",  title: '프렌차이즈', selected:false},
    {  value: 3, parentId: 0, id: 2,   subTitle: "Restaurant",  title: '레스토랑', selected:false},
    {  value: 4, parentId: 0, id: 3,   subTitle: "Cafeteria",  title: '일반음식점', selected:false},
    {  value: 5, parentId: 0, id: 4,   subTitle: "Bar/Club",  title: 'Bar/Club', selected:false},
    {  value: 6, parentId: 0, id: 5,   subTitle: "Beer/Pub",  title: '주점/호프/펍', selected:false},
    {  value: 7, parentId: 0, id: 6,   subTitle: "etc.",  title: '기타 (요식/식당)' , selected:false},
     
    {  value: 1, parentId: 1, id: 7,   subTitle: "Fashion Store",   title: '패션', selected:false},
    {  value: 2, parentId: 1, id: 8,   subTitle: "Beauty Store",   title: '뷰티', selected:false},
    {  value: 3, parentId: 1, id: 9,   subTitle: "General Store",   title: '일반매장', selected:false},
    {  value: 4, parentId: 1, id: 10,  subTitle: "Department Store",   title: '백화점/쇼핑몰', selected:false},
    {  value: 5, parentId: 1, id: 11,  subTitle: "Exhibition",   title: '전시회 부스', selected:false},
    {  value: 6, parentId: 1, id: 12,  subTitle: "Pop-up store",   title: '팝업스토어', selected:false},
    {  value: 7, parentId: 1, id: 13,  subTitle: "etc.",   title: '기타 (상업공간)' ,selected:false},
     
    {  value: 1, parentId: 2, id: 14,  subTitle: "Institute",   title: '학원', selected:false},
    {  value: 2, parentId: 2, id: 15,  subTitle: "Cramming Room",   title: '독서실', selected:false},
    {  value: 3, parentId: 2, id: 16,  subTitle: "Kindergarten",   title: '유치원/어린이집', selected:false},
    {  value: 4, parentId: 2, id: 17,  subTitle: "Training Institute",   title: '연수/수련원', selected:false},
    {  value: 5, parentId: 2, id: 18,  subTitle: "School",   title: '학교/대학', selected:false},
    {  value: 6, parentId: 2, id: 19,  subTitle: "etc.",   title: '기타 (교육공간)' , selected:false},
     
    {  value: 1, parentId: 3, id: 20,  subTitle: "General Hospital",   title: '일반병원/의원', selected:false},
    {  value: 2, parentId: 3, id: 21,  subTitle: "Oriental Clinic",   title: '한방병원/한의원', selected:false},
    {  value: 3, parentId: 3, id: 22,  subTitle: "Beauty Clinic",   title: '성형외과', selected:false},
    {  value: 4, parentId: 3, id: 23,  subTitle: "Pediatrics",   title: '소아/내과', selected:false},
    {  value: 5, parentId: 3, id: 24,  subTitle: "Dental Clinic",   title: '치과', selected:false},
    {  value: 6, parentId: 3, id: 25,  subTitle: "Animal Hospital",   title: '동물병원', selected:false},
    {  value: 7, parentId: 3, id: 26,  subTitle: "Pharmacy",   title: '약국', selected:false},
    {  value: 8, parentId: 3, id: 27,  subTitle: "etc.",   title: '기타 (의료공간)' , selected:false},
     
    {  value: 1, parentId: 4, id: 28,  subTitle: "Fitness/Yoga Studio",   title: '휘트니스/요가', selected:false},
    {  value: 2, parentId: 4, id: 29,  subTitle: "Play Ground",   title: '놀이형 공간', selected:false},
    {  value: 3, parentId: 4, id: 30,  subTitle: "Golf",   title: '골프연습장', selected:false},
    {  value: 4, parentId: 4, id: 31,  subTitle: "Physical Training",   title: '체육도장', selected:false},
    {  value: 5, parentId: 4, id: 32,  subTitle: "Ping-pong",   title: '탁구/당구/볼링장', selected:false},
    {  value: 6, parentId: 4, id: 33,  subTitle: "etc.",   title: '기타 (운동공간)' , selected:false},
     
    {  value: 1, parentId: 5, id: 34,  subTitle: "Hotel",   title: '호텔/모텔/레지던스', selected:false},
    {  value: 2, parentId: 5, id: 35,  subTitle: "Guest House",   title: '게스트하우스', selected:false},
    {  value: 3, parentId: 5, id: 36,  subTitle: "Pension",   title: '펜션', selected:false},
    {  value: 4, parentId: 5, id: 37,  subTitle: "etc.",   title: '기타 (숙박공간)', selected:false},
     
    {  value: 1, parentId: 6, id: 38,  subTitle: "Finance Office",   title: '금융(은행, 증권)', selected:false},
    {  value: 2, parentId: 6, id: 39,  subTitle: "Estate Office",   title: '중개사무소(부동산 등)', selected:false},
    {  value: 3, parentId: 6, id: 40,  subTitle: "etc.",   title: '기타 (금융/중개)', selected:false},
      
    {  value: 1, parentId: 7, id: 41,  subTitle: "Company Building",   title: '사옥', selected:false},
    {  value: 2, parentId: 7, id: 42,  subTitle: "Office Room",   title: '일반 사무실', selected:false},
    {  value: 3, parentId: 7, id: 43,  subTitle: "etc.",   title: '기타 (사무공간)', selected:false},
      
    {  value: 1, parentId: 8, id: 44,  subTitle: "Broadcasting Studio",   title: '방송/사진 스튜디오', selected:false},
    {  value: 2, parentId: 8, id: 45,  subTitle: "Sound Studio",   title: '음향/레코딩 스튜디오', selected:false},
    {  value: 3, parentId: 8, id: 46,  subTitle: "Control Room",   title: '컨트롤룸/서버룸', selected:false},
    {  value: 4, parentId: 8, id: 47,  subTitle: "etc.",   title: '기타 (특수업무공간)', selected:false},
     
    {  value: 1, parentId: 9, id: 48,  subTitle: "Apartment",   title: '아파트/주상복합', selected:false},
    {  value: 2, parentId: 9, id: 49,  subTitle: "Villa",   title: '빌라/연립주택', selected:false},
    {  value: 3, parentId: 9, id: 50,  subTitle: "Efficency",   title: '오피스텔/원룸', selected:false},
    {  value: 4, parentId: 9, id: 51,  subTitle: "etc.",   title: '기타 (공동주택)', selected:false},

    {  value: 1, parentId: 10, id: 52, subTitle: "Detached house",   title: '일반 단독주택', selected:false},
    {  value: 2, parentId: 10, id: 53, subTitle: "Small house",   title: '협소주택', selected:false},
    {  value: 3, parentId: 10, id: 54, subTitle: "Villa",   title: '별장/전원주택', selected:false},
    {  value: 4, parentId: 10, id: 55, subTitle: "Townhouse",   title: '타운하우스', selected:false},
    {  value: 5, parentId: 10, id: 56, subTitle: "Hanok",   title: '한옥', selected:false},
    {  value: 6, parentId: 10, id: 57, subTitle: "etc.",   title: '기타 (단독주택)', selected:false},
]


	function srcConvert(str, opt) {
		
		if (!str) {
			return '';
		}
		if (!/^\/file\/download/.test(str)) {
			return str;
		}
		if (!opt) {
			opt = 1;
		}
		var match = str.match(/\/file\/download\/(\w+\.\w{2,5})/),
			result;


		match = match? match[1] : str;
		switch (opt) {
			case 1:
				result = '/file/download/small-' + match;
				break;

			case 2:
				result = '/file/download/medium-' + match;
				break;

			case 3:
				result = '/file/download/large-' + match;
				break;

			default:
				throw new Error('src2convert ' + opt + ' is default');
        }
        
		return result;
    }//end of srcConvert
    
    function isNumeric(text, option) {
		// 좌우 trim(공백제거)을 해준다.
		text = String(text).replace(/^\s+|\s+$/g, "");
		let regex;
		if(typeof option.toString() === "undefined" || option.toString() === "1"){
			// 모든 10진수 (부호 선택, 자릿수구분기호 선택, 소수점 선택)
			regex = /^[+]?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+){1}(\.[0-9]+)?$/g;
		}else if(option.toString() === "2"){
			// 부호 미사용, 자릿수구분기호 선택, 소수점 선택
			regex = /^(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+){1}(\.[0-9]+)?$/g;
		}else if(option.toString() === "3"){
			// 부호 미사용, 자릿수구분기호 미사용, 소수점 선택
			regex = /^[0-9]+(\.[0-9]+)?$/g;
		}else{
			// only 숫자만(부호 미사용, 자릿수구분기호 미사용, 소수점 미사용)
			regex = /^[0-9]$/g;
		}
		
		if( regex.test(text) ){
			text = text.replace(/,/g, "");
			return isNaN(text) ? false : true;
		} else { 
			return false;  
		}
	}

    function dehtmlSpecialChars(text) {

		if (!text) {

			return '';
		}
		if ( isNumeric(text, 1) ) {
			//text = String(text);

			text = text.toString();
			return text;
		}
        if ( typeof text != 'string' ) {
            return text;
        }

		return text.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#039;/g, "'");
	}//end of dehtmlSpecialChars
  
  
    const specialty = {
		interior: {
			name: '인테리어',
			interiorFull: '디자인 + 시공',
			interiorDesign: '디자인',
			interiorContractor: '시공',
			interiorStyling: '스타일링',
            interiorPart: '부분 의뢰'
        },
        construction: {
			name: '건축',
			constructionDesign: '건축 설계',
			constructionContractor: '건축 시공',
			constructionSupervision: '건축 감리'
		}, 
	
    };
    const mainSpecialty = ['', '상업공간', '주거공간', '업무공간', '기타공간'];

	const businessType = ['법인사업자', '개인/팀', '개인사업자'];

	function numberComma(number) {
		if(number < 1){
			return 0;
		}
		return removeComma(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	function removeComma(number) {
		return parseInt(number.toString().replace(/,/g,""));
	}

	

const baseUrl = "https://ibrothers.kr/api";

export default{
    spaces1  : spaces1,
    spaces2  : spaces2,
    spaces3  : spaces3,
    style    : style, 
    srcConvert : srcConvert,
    dehtmlSpecialChars : dehtmlSpecialChars,
    specialty : specialty,
    mainSpecialty : mainSpecialty,
	businessType : businessType,
	numberComma : numberComma,
	removeComma : removeComma,
    baseUrl : baseUrl,

}
