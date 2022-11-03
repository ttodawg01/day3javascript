// console.log('This is my promise to you.');

// // Callback Hell Problem is solved with Promises!


// /*
//     In JavaScript, a promise is an object that returns a value which you hope to receive in the future, but not now.
//     Has three states:
//     1. Pending: initial state, neither fulfilled nor rejected
//     2. Fulfilled: meaning that the operation was completed successfully, will return a value
//     3. Rejected: meaning that the operation failed, will return a error message
// */

// // Promise-based function
// function downloadSong(songName){
//     console.log(`Searching for ${songName} in our database...`);
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (songName.length > 4){
//                 resolve(`${songName}.mp4`);
//             } else {
//                 reject(`${songName} is not in the database`);
//             };
//         }, 4000);
//     });
// };

// let mySong = downloadSong('Dancing On My Own');
// console.log(mySong);

// function playSong(songMP4){
//     console.log(`${songMP4} is now playing`)
// }
// mySong.then(playSong);

// downloadSong('Let It Be').then(playSong);
// downloadSong('ABC').then(playSong, err => console.error(err));
// downloadSong('ABC').then(playSong).catch(err => console.error(err));



// downloadSong('Stairway to Heaven')
//     .then(val => {
//         console.log('first .then', val);
//         return val.toUpperCase()
//     })
//     .then(upper => console.log('second .then',`This is the song in all caps: ${upper}`))
//     .catch(err => console.warn(err));

// Real Life Example
// Get the price of a user's total based on their id
// userId -> user -> user's orders -> calculate the order total


function getUser(userId){
    return new Promise((resolve, reject) => {
        console.log(`Searching for user #${userId} in database...`);
        setTimeout(() => {
            // Set up some fake rule for an existing user
            if (userId > 100){
                let user = {
                    id: userId,
                    username: 'johnqsample'
                };
                resolve(user);
            } else {
                reject(`No user with id #${userId}`);
            };
        }, 2000);
    });
};


function getUserOrder(user){
    return new Promise((res, rej) => {
        console.log(`Getting the orders for ${user.username}`);
        setTimeout(() => {
            let orders = [
                {prodName: 'Frame', price: 29.95},
                {prodName: 'Lamp', price: 47.75},
                {prodName: 'Notebook', price: 9.95}
            ];
            if (user.id > 150){
                res(orders);
            } else {
                rej("This user has no orders");
            };
        }, 3000);
    });
};

function getOrderTotal(order){
    return new Promise((res, rej) => {
        console.log(`Calculating order total:...`);
        setTimeout(() => {
            let total = 0;
            order.forEach(p => total += p.price);
            res(total);
        }, 1000);
    });
};


function getTotalFromUserId(userId){
    getUser(userId)
        .then(user => getUserOrder(user))
        .then(orders => getOrderTotal(orders))
        .then(total => console.log(`User #${userId} has a total of $${total}`))
        .catch(err => console.warn(err))
};


// Async / Await - allows us to write our code to LOOK more synchronous *It is simply syntactical sugar for Promises*

/*
Similar Function in Python:
def get_total_from_user_id(user_id):
    user = get_user(user_id)
    order = get_user_order(user)
    total = get_order_total(order)
    print(f"User #{user_id} has a total of ${total}")
*/

async function getUserTotal(userId){
    try{
        let user = await getUser(userId);
        let order = await getUserOrder(user);
        let total = await getOrderTotal(order);
        console.log(`User #${userId} has a total of $${total}`);
    } catch(err) {
        console.warn(err);
    }
};

getUserTotal(453);

let arrowUserEx = async (id) => {
    let user = await getUser(id);
    return user
}

console.log(arrowUserEx(4324));