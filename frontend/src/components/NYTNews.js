import React from 'react'
import NYTNewsBox from './NYTNewsBox'

function NYTNews({articles}){
    return(
        <>
        <NYTNewsBox article = {articles[0]}/>
        <NYTNewsBox article = {articles[1]}/>
        <NYTNewsBox article = {articles[2]}/>
        <NYTNewsBox article = {articles[3]}/>
        <NYTNewsBox article = {articles[4]}/>
        <NYTNewsBox article = {articles[5]}/>
        <NYTNewsBox article = {articles[6]}/>
        <NYTNewsBox article = {articles[7]}/>
        <NYTNewsBox article = {articles[8]}/>
        <NYTNewsBox article = {articles[9]}/>
        </>
    );
}

export default NYTNews;