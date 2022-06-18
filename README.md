ctrl + space => shows imports

ctr + shift + k => delete line

react-redux :
Provider 
useSelector
useDispatch

@reduxjs/toolkit:
configureStore

function plusItemCount() {
        dispatch(increaseProductItemCount())
    }
bunu funksiya yaratmadan inclickde istifade etmek olarmi?

baglar:
1- addtobasketde settimeout functionuna gore error gelir(basket-e basanda)
Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.


gorulecek isler:
pay now ya basanda qeydiyyatda deyilemse sign in cixsin
sign in olanda hesabim olmayanda giris yap yazisi olsun
valid form ,localstorage
basqa categoriye kecende filterler hamisi silinmelidi
home pagede search input


 addToFavBox: (state, { payload }) => {
            console.log(state.favoriteBox);
            state.favoriteBox = [...new Set([...state.favoriteBox, payload])]
            state.favoriteBox.map(item => {
                item.favorite = true
                return item
            }) bele dalbadal state-i deyismek olmazmis error verir Cannot assign to read only property 'favorite' of object '#<Object>'
        }


