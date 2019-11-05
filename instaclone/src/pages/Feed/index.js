import React, { useState, useEffect} from 'react';
import { View, FlatList } from 'react-native';

import { Post } from './styles'

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
            <FlatList 
                data={feed}
                keyExtractor={post => String(post.id)}
                renderItem={({ item })=> (
                    <Post>
                        <Header>
                            <Avatar 
                                source={{uri: item.author.avatar}}
                            />
                        </Header>
                    </Post>
                )}
            />

        </View>
    )
}
