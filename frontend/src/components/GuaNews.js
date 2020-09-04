import React from 'react'
import GuaNewsBox from './GuaNewsBox'

function GuaNews({articles}){
    return(
        <>
        <GuaNewsBox article = {articles[0]}/>
        <GuaNewsBox article = {articles[1]}/>
        <GuaNewsBox article = {articles[2]}/>
        <GuaNewsBox article = {articles[3]}/>
        <GuaNewsBox article = {articles[4]}/>
        <GuaNewsBox article = {articles[5]}/>
        <GuaNewsBox article = {articles[6]}/>
        <GuaNewsBox article = {articles[7]}/>
        <GuaNewsBox article = {articles[8]}/>
        <GuaNewsBox article = {articles[9]}/>
        </>
    );
}

export default GuaNews;