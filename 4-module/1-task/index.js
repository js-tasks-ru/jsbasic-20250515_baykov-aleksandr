function makeFriendsList(friends) {

  let result = document.createElement('ul');
  
  friends.forEach(friend => {
    let listItem = document.createElement('li');
    listItem.textContent = `${friend.firstName} ${friend.lastName}`;
    result.appendChild(listItem);
  });

  return result;
}
