import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import HamburgerMenu from '../components/HamburgerMenu'
import "react-datepicker/dist/react-datepicker.css";

import PngIcons from "../assets/icons/PngIcons";
import SvgIcons from "../assets/icons/SvgIcons";
import Navbar from "../components/Navbar";
import Slides from "../components/Slides";
import Footer from "../components/Footer";

import {
  AllLeagues,
  INITIAL_MATCHES,
  MONTH_NAMES,
  topLeagues,
} from "../utils/constants";
import ReactCountryFlag from "react-country-flag";

const FirstPage = () => {
  const today = useMemo(() => new Date(), []);
  const [matches, setMatches] = useState({});
  const [loading, setLoading] = useState(true);
  const [minimized, setMinimized] = useState({});
  const [filterDate, setFilterDate] = useState(today);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [showFilterInput, setShowFilterInput] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [showLiveMatches, setShowLiveMatches] = useState(false);
  const [windowWidth,setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    requestMatchesData();
  }, [filterDate, showLiveMatches]);

  const toggleShowLiveMatches = () => {
    if (loading) { alert('Loading... please wait...'); return; }
    if (!showLiveMatches) {
      setFilterDate(today);
    }
    setShowLiveMatches(!showLiveMatches);
  }

  const toggleLike = (id) => {
    const newData = { ...matches };
    Object.keys(newData).forEach(league_country => {
      const leagues = matches[league_country];
      leagues.forEach((match, idx) => {
        if (match.id === id)
          newData[league_country][idx].like = newData[league_country][idx].like ? false : true;
      })
    })
    setMatches(newData);
  }

  const requestMatchesData = async () => {
    setLoading(true);

    let url = `http://77.68.115.22:3000/matches/date/${filterDate.getFullYear()}-${filterDate.getMonth() + 1}-${filterDate.getDate()}`;
    if (filterText.length > 0 && showFilterInput) url += `?search=${filterText}`;
    if (showLiveMatches) url = 'http://77.68.115.22:3000/matches/live';
    const res = await fetch(url);
    const data = await res.json();
    let newData = {};

    data.data.forEach(match => {
      const country = match.league_country;
      if (!newData[country])
        newData[country] = [];
      newData[country].push(match)
    });

    setMatches(newData);
    setLoading(false);
    setMinimized({});
  };

  const onFilterDateChanged = (date) => {
    if (loading) { alert('Loading... please wait...'); return; }
    setFilterDate(date);
  };
  const toggleShowFilterInput = () => {
    setShowFilterInput(!showFilterInput);
  };
  const onPrevDate = () => {
    if (loading) { alert('Loading... please wait...'); return; }
    const oneDayInMillis = 24 * 60 * 60 * 1000;
    setFilterDate(new Date(filterDate.getTime() - oneDayInMillis));
  };
  const onNextDate = () => {
    if (loading) { alert('Loading... please wait...'); return; }
    const oneDayInMillis = 24 * 60 * 60 * 1000;
    console.log(filterDate, new Date(filterDate + oneDayInMillis));
    setFilterDate(new Date(filterDate.getTime() + oneDayInMillis));
  };

  const toggleMinimized = (country) => {
    const newData = { ...minimized };
    newData[country] = !newData[country] ? true : false;
    setMinimized(newData);
  }

  const onKeyDown = (e) => {
    if (loading) { alert('Loading... please wait...'); return; }
    if (e.key === 'Enter')
      requestMatchesData();
  }

  const renderMatches = () => {
    return Object.keys(matches).map((league_country) => {
      const league_matches = matches[league_country];
      return (
        <div>
          <div className="darkbody-main" onClick={() => toggleMinimized(league_country)}>
            <div className="darkbody-subOne">
              <ReactCountryFlag svg countryCode={league_matches[0]['league_country_code']} style={{ width: '30px' }} />
              <div>
                <h2>{league_country}</h2>
                <p>{ }</p>
              </div>
            </div>
            <div>
              <SvgIcons.RightIcon />
            </div>
          </div>

          {minimized[league_country] !== true && league_matches.map(match => (
            <div className="lightbody-main">
              <div className="lightbody-subOne">
                <div className="lightbody-subOne-pOne">
                  {match['timer'] === 'NULL'
                    ? (('0123456789'.indexOf(match['status'][0]) !== -1)
                      ? match['status']
                      : 'Ended'
                    )
                    : `${match['timer']}'`}
                </div>
                <div className="lightbody-subOne-ptwo">
                  <div className="d-flex align-items-center">
                    <span className="white-lightbody mr_16">{match['home_team_goals'] | 0}</span>
                    <img className="mr_8" width={25} src={match['home_team_image_url']} />
                    <span className="white-lightbody">{match['home_team_name']}</span>
                  </div>

                  <div className="d-flex mt_8 align-items-center">
                    <span className="white-lightbody mr_16">{match['away_team_goals'] | 0}</span>
                    <img className="mr_8" width={25} src={match['away_team_image_url']} />
                    <span className="white-lightbody">{match['away_team_name']}</span>
                  </div>
                </div>
              </div>

              <div style={{ cursor: 'pointer' }} onClick={() => toggleLike(match['id'])}>
                <SvgIcons.Heart color={match['like'] ? '#ff2222' : '#7F97AC'} />
              </div>
            </div>
          ))
          }

        </div>
      );
    });
  };
  
  /* Added here:getting window innerWidth at every resize update */
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize',handleResize)
    return (() => window.removeEventListener('resize',handleResize))
  },[windowWidth])

  return (
    <div id="firstpage-main-all">
      {windowWidth >= 768 ? <div className="w-85">
        <Navbar />
      </div> : 
      <div className="hamburger-header">
        <Navbar />
        <img src="https://i.pinimg.com/originals/17/0d/98/170d98e54ff7d32e417f12a087ed6c22.jpg" alt="UK flag" style={{width:"25px",marginRight:"25px"}} />
        <HamburgerMenu />
      </div>}

      <div className="bar"></div>

      <div className="w-85">
        <Slides />
      </div>

      <div className="main-board">
        <div className="main-left-bar hidden md:block">
          <h1>Top Leagues</h1>
          <div className="topleagues-main">
            {topLeagues.map((ele, ind) => {
              return (
                <div>
                  <img src={ele.flag} alt="flag" />
                  {ele.name}
                </div>
              );
            })}
          </div>
          <div className="left-AD mt_26">
            <img src={PngIcons.AD} style={{ width: "100%" }} />
          </div>
          <h1 className="mt_26">All Leagues</h1>
          <div className="filter-input-main">
            <div className="inp-srch">
              <SvgIcons.SearchIcon />
            </div>

            <input type="text" className="filter-input" placeholder="Filter" />
          </div>

          <div className="allleagues-main mt_26">
            {AllLeagues.map((ele, ind) => {
              return (
                <div>
                  <div style={{ gap: "8px", marginBottom: "0px" }}>
                    <img src={ele.flag} alt="flag" />
                    {ele.name}
                  </div>
                  <div>
                    <SvgIcons.DropDown />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="main-right-bar w-full md:w-10/12">
          <div className="right-nav">
            <div className="d-flex" style={{ alignItems: "center" }}>
            
              {windowWidth >= 767 && <div className="right-nav-date ml_30">
                {filterDate.getDate() === today.getDate() && filterDate.getMonth() === today.getMonth() && <><span className="FFF-c">Today</span>,{" "}</>}
                {`${filterDate.getDate()} ${MONTH_NAMES[filterDate.getMonth()]}`}
              </div>}

              <div className={`right-nav-live ${showLiveMatches ? 'show-live' : ''}`} onClick={toggleShowLiveMatches}>
                <SvgIcons.Dot color={showLiveMatches ? 'lightgreen' : 'grey'} /> LIVE
              </div>
            </div>
            
            <div className={windowWidth <= 280 ? `hidden sm:flex calendar-filter` : 'sm:flex calendar-filter'}>
              {showFilterInput && (
                <div className="right-nav-filter">
                  <input
                    className="filter-text-input"
                    placeholder="Input Filter..."
                    value={filterText}
                    onKeyDown={onKeyDown}
                    onChange={(e) => setFilterText(e.target.value)}
                  />
                </div>
              )}
              {windowWidth >= 640 && <div className="right-nav-filter ml_8">
                <a className="button-link" onClick={toggleShowFilterInput}>
                  <SvgIcons.Filter />
                </a>
              </div>}
               <div className="right-nav-filter d-flex w-255 space-between ml_8">
                <a className="button-link" onClick={onPrevDate}>
                  <SvgIcons.LeftIcon />
                </a>
                <div className="d-flex align-items-center gap-10">
                  {`${filterDate.getDate()} ${MONTH_NAMES[filterDate.getMonth()]
                    }`}
                  <a
                    className="button-link"
                    onClick={() => setDatePickerOpen(true)}
                  >
                    <SvgIcons.Calendar />
                  </a>
                  <div style={{ marginLeft: "-20px" }}>
                    <DatePicker
                      open={datePickerOpen}
                      selected={filterDate}
                      onChange={onFilterDateChanged}
                      onClickOutside={() => setDatePickerOpen(false)}
                    />
                  </div>
                </div>
                <a className="button-link" onClick={onNextDate}>
                  <SvgIcons.RightIcon />
                </a>
              </div>
            </div>
            
          </div>

          <div className="right-body">
            {loading ? <p style={{ color: 'white' }}>Loading</p> : renderMatches()}
          </div>
        </div>
      </div>

      <div className="w-100 mt_96 d-flex justify-content-center bg-0D1A28">
        <div className="w-85">
          <Footer />
        </div>
      </div>
    </div>
  );
};
export default FirstPage;
