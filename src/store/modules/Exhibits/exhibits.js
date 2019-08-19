export default {
    state: {
        imgUrl:localStorage.getItem('imgUrl') || '',
        text:localStorage.getItem('text') || ''
    },
    mutations: {
        changeImgUrl(state,value){
            state.imgUrl = value;
        },
        changeText(state,value){
            state.text = value;
        }
    }
}
