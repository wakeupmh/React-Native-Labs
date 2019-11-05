import React, { useState, useEffect} from 'react';

import { View } from 'react-native';

export default function Feed() {
    const [feed, setFeed] = useState([]);
    
    useEffect(()=>{
        async function loadFeed() {
            const response = await fetch(
                'http://localhost:3000/feed?_expand=author&_limit=5&_page=1'
            );

            const data = await response.json();

            setFeed(data);
        }
    }, []); 

    return(
        <View>
            
        </View>
    )
}
