function setItemTillMidnight(key, value) {
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);

    const ttl = midnight.getTime() - now.getTime(); // Time till midnight in milliseconds

    const item = {
        value: value,
        expiry: now.getTime() + ttl,
    };

    localStorage.setItem(key, JSON.stringify(item));
}


function getItemWithExpiry(key) {
    const itemStr = localStorage.getItem(key);

    // If the item doesn't exist, return null
    if (!itemStr) {
        return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    // Compare the current time with the expiry time
    if (now.getTime() > item.expiry) {
        // If the item has expired, remove it from storage and return null
        localStorage.removeItem(key);
        return null;
    }

    // If the item is still valid, return its value
    return item.value;
}

export {setItemTillMidnight, getItemWithExpiry };
