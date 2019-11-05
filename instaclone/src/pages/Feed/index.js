import React, { useState, useEffect} from 'react';
import { View, FlatList } from 'react-native';

import { Post } from './styles'

export default function Feed () {
    const [feed, setFeed] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const LIMIT = 5;

    async function loadPage (pageNumber = page) {

        if(total && pageNumber > total) return;

        const response = await fetch(
            `http://localhost:3000/feed?_expand=author&_limit=${LIMIT}&_page=${pageNumber}`
        );
        const data = await response.json();
        const totalItems = response.headers.get('X-Total-Count');

        setTotal(Math.floor(totalItems / LIMIT))
        setFeed([...feed, ...data]);
        setPage(pageNumber + 1);
    }

    useEffect(()=> {
        loadPage();
    }, []); 

    return(
        <View>
            <FlatList 
                data={feed}
                keyExtractor={post => String(post.id)}
                onEndReached={() => loadPage()}
                onEndReachedThreshold={0.1}
                renderItem={({ item })=> (
                    <Post>
                        <Header>
                            <Avatar ratio={ item.aspectRatio } source={{ uri: item.author.avatar }}/>
                            <Name> { item.author.name } </Name>
                        </Header>

                        <PostImage ratio={ item.aspectRatio } source={{ uri: item.image }}/>

                        <Description>
                            <Name> { item.author.name } </Name> {item.description}
                        </Description>
                    </Post>
                )}
            />
        </View>
    )
}
