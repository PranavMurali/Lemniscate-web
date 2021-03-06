import React , {useState,useEffect} from 'react';
import {useStateValue} from "../../StateProvider";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
let Times=[];
let Games=[];
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Play Time',
    },
  },
};

const labels = Games;
export const data = {
  labels,
  datasets: [
    {
      label: 'Pranav Murali',
      data: Times,
      borderColor: 'rgb(100,255,200)',
      backgroundColor: 'rgba(255,255,255)',
    },
  ],
};

function Insights() {
  const [{games},dispatch] =useStateValue();
  const [SteamGames, setSteamGames] = useState([]);
    useEffect(() => {
      fetchData()
    }, [])
    var colors = [""];
    const fetchData = async () => {
      const userResponse = await fetch(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=C64EB9B2D1B3564C81FCA9AB0C3B2709&include_appinfo=1&steamid=76561198866299738&format=json`);
      const userData = await userResponse.json()
      setSteamGames(userData.response.games);
      console.log(userData.response.games);
  }

  useEffect(()=>{
    dispatch({
      type:"SET_GAMES",
      data:Games,
    })
  },[Games])

  useEffect(()=>{
    dispatch({
      type:"SET_TIMES",
      data:Times,
    })
  },[Times])

  return (
    <>
    <div className=" w-full grid gap-8 grid-row-4">
      <section className=" w-screen text-white bg-gray-900">
        <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold sm:text-6xl">
              <span className='w-full text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400'>{colors[Math.floor(Math.random()*colors.length)]}</span>
            </h2>

            <p className="mt-4 sm:text-xl">
              Let's find out what you've been upto lately.
            </p>
          </div>

          <ul className="grid grid-cols-1 gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3">
            <li className="p-8 shadow-xl rounded-xl">
              <p className="text-3xl font-extrabold">x</p>
              <p className="mt-1 text-xl font-medium">Hours played</p>
            </li>

            <li className="p-8 shadow-xl rounded-xl">
              <p className="text-3xl font-extrabold">{Games.length}</p>
              <p className="mt-1 text-xl font-medium">Games Played</p>
            </li>

            <li className="p-8 shadow-xl rounded-xl">
              <p className="text-3xl font-extrabold">1</p>
              <p className="mt-1 text-xl font-medium">Platform</p>
            </li>
          </ul>
        </div>
      </section>
      <div className="flex flex-wrap items-center mt-10">
    {SteamGames.map(game => (
    <>
     <div className=" ml-28 w-full max-w-xs text-center" key={game.appid}>

      <div className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">{game.name}</h3>
          <div className="scale-150">
            <img class="scale-50" src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`} />
          </div>
          <span className="mt-1 font-medium text-gray-600 dark:text-gray-300">{((game.playtime_forever)/60).toFixed(2)} hours</span>
          {Times.push(((game.playtime_forever)/60).toFixed(2))}
          {Games.push(game.name)}
          {console.log(Times)}
          {console.log(Games)}
      </div>
    </div>
   </>
   ))}
   <div className='w-full h-1/2 p-40'>
        <Line options={options} data={data}/>
   </div>

   </div>
</div>
</>

  
  );
  
}

export default Insights;
