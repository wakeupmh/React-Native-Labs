import React, { useState, useEffect} from 'react';
import { View, FlatList } from 'react-native';

import { Post, Header, Avatar, Name, PostImage, Description, Loading } from './styles'



export default function Feed () {
    const [feed, setFeed] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const LIMIT = 5;

    async function loadPage (pageNumber = page) {

        if(total && pageNumber > total) return;
        
        setLoading(true);

        const response = await fetch(
            `http://localhost:3000/feed?_expand=author&_limit=${LIMIT}&_page=${pageNumber}`
        );
        const data = await response.json();
        const totalItems = response.headers.get('X-Total-Count');

        setTotal(Math.floor(totalItems / LIMIT))
        setFeed([...feed, ...data]);
        setPage(pageNumber + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadPage();
    }, []); 

    return(
        <View>
            <FlatList 
                data={feed}
                keyExtractor={post => String(post.id)}
                onEndReached={() => loadPage()}
                onEndReachedThreshold={0.1}
                ListFooterComponent={loading && <Loading/>}
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
