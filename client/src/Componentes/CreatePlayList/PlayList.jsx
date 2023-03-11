import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getAllPlaylists, getPlaylistTracks, getUser, getPlayer, isPlaying, playlistDeleteTrack } from '../../Actions/actions';
import play from '../Detail/play.png'
import pic from './pic.jpg'



function PlayList() {

    // ----------------------------------- ESTADOS ----------------------------------------

    const { user, isAuthenticated } = useAuth0();
    const infoToken = useSelector(state => state.token)
    const dispatch = useDispatch()
    const playlistTracks = useSelector(state => state.playlistTracks)
    const playlist = useSelector(state => state.playlists.playlists)

    const [data, setData] = useState({
        name: '',
        tracks: [],
        i: 0,
    })

    // ----------------------------------- HANDLERS ----------------------------------------

    function handleClick(e) {
        setData({ ...data, i: e })
        setTimeout(() => {
            dispatch(getPlayer({ tracks: data.tracks, i: e }))
            dispatch(isPlaying())
        }, 400)
    }

    function deleteTrack(track_id) {
        dispatch(playlistDeleteTrack(playlist[0]?.id, track_id))
        setTimeout(() => {
            dispatch(getPlaylistTracks(playlist[0]?.id))
        }, 500)
    }

    // ----------------------------------- EFFECTS ----------------------------------------

    useEffect(() => {
        if (infoToken) {
            dispatch(getUser())
            dispatch(getAllPlaylists())
            dispatch(getPlaylistTracks(playlist[0]?.id))
        }
    }, [infoToken])


    useEffect(() => {
        if (playlistTracks?.tracks) {
            setData({ name: playlistTracks.name, tracks: playlistTracks.tracks, i: data.i })
        }
    }, [playlistTracks])

    // ----------------------------------- RENDERIZADO ----------------------------------------

    return (

        isAuthenticated ? (
            <Div>
                <div className=' contenedor'>
                    <div className=" bg-dark mw-100 pt-2 pb-1  container-fluid oki" >
                        <div className="row g-0 container-fluid">
                            <div className="col-md-4 container-fluid">
                                <img src={user.picture} className="img-thumbnail bg-dark pancho " alt="fotouser" />
                            </div>
                            <div className="col-md-8 container">
                                <div className="card-body">
                                    <br />
                                    <p className="card-text p-0"> Las canciones que te gustaron</p>
                                    <h1 className="card-title display-1 p-0 m-0 name">{user.name}</h1>
                                </div>
                            </div>
                        </div>
                        <br />
                        <Link to={"/home"}>
                            <button className=" ms-3 regresar btn-dark" type="button">Volver al Menu</button>
                        </Link>
                    </div>
                </div>

                {/* PLAYLIST */}

                <div className='contenedordos container-fluid'>
                    <ul className="list-group list-group-numbered container-fluid ">
                        <li className="ms-0 list-group-item d-flex justify-content-between align-items-start bg-transparent text-white">
                            <div className="row position-fixed-top container-fluid">
                                {playlistTracks?.tracks?.map(el => (
                                    <li className=" col-8 d-flex align-items-center bg-transparent text-light">
                                        <img onClick={() => handleClick(playlistTracks.tracks.indexOf(el))} className='fotico ms-2' src={play} alt="play" />
                                        <div className=" ms-4 me-auto container-fluid d-flex justify-content-start">
                                            {el.name}
                                        </div>
                                        <div className='w-100 d-flex container-fluid justify-content-end'>
                                            <button className=' eliminar' onClick={() => deleteTrack(el.id)}> Eliminar </button>
                                        </div>
                                    </li>
                                ))}
                            </div>
                        </li>
                    </ul>
                </div>
            </Div>
        ) : <div className="uwu w-100 container-fluid bg-dark">
            <img style={{ width: "100%", height: "100%" }} src={pic} alt="" />
        </div>
    )
}

export default PlayList

// ----------------------------------- ESTILOs ----------------------------------------

const Div = styled.div`


.eliminar {
    background-color: #FFFF01;
    height: 30px;
}

.eliminar:hover {
    cursor: pointer;
    transform: scale(1.08);
    transition: all 0.3s;
  
}

.playlist{
    background-color: black;
}

.regresar {
   font-weight: 500;
    font-size: 20px;
    color: #FFFF01;
    background: rgb(194,194,45);
    background: linear-gradient(337deg, #070702 0%, rgba(0,0,0,1) 80%);
}

span{
    font-size: 15px;
}

li{
    border:none;
}

.fotico{
    width: 35px;
}

.fotico:hover {
    cursor: pointer;
    transform: scale(1.08);
    transition: all 0.3s;
  
}

.name {
    font-weight: 600;
    text-decoration: overline #FFFF01;
}
p{
    font-size: 30px;
}

.oki {
    background-image: linear-gradient(
  140deg,
  hsl(0deg 0% 0%) 0%,
  hsl(339deg 0% 0%) 29%,
  hsl(339deg 0% 0%) 43%,
  hsl(301deg 14% 23%) 57%,
  hsl(300deg 16% 46%) 71%,
  hsl(0deg 0% 0%) 100%
);
}

color: white;

img {
    width: 350px;
    border-radius: 20px;
    max-width: 350px;  
    
}

.pancho {
    max-width: 300px;
    max-height: 400px;
    box-shadow: 19px 17px 13px -9px rgba(157, 250, 129, 0.89);
-webkit-box-shadow: 19px 17px 13px -9px rgba(0, 0, 0, 0.89);
-moz-box-shadow: 19px 17px 13px -9px rgba(0, 0, 0, 0.89);
}

background-color: black;

.contenedor{
    width: auto;
    height: auto;
}


.contenedordos{
    width: auto;
   min-height: 120vh;
   max-height: auto;
    background: rgb(194,194,45);
    background: linear-gradient(337deg, rgba(194,194,45,1) 0%, rgba(0,0,0,1) 70%);
    color: white;
    border:none;


}


`

