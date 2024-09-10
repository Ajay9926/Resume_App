import React from 'react'
import { Link } from 'react-router-dom'
import style from '../styles/SelectTemplate.module.css'


const SelectTemplate = ({ setTheme }) => {
  return (
    <div className={style.template_container}>
      <div className={style.template1}>
        <Link to={'/resume_form'}><button onClick={() => setTheme("1")}>Use This</button></Link>
      </div>
      <div className={style.template2}>
        <Link to={'/resume_form'}><button onClick={() => setTheme("2")}>Use This</button></Link>
      </div>
      <div className={style.template3}>
        <Link to={'/resume_form'}><button onClick={() => setTheme("3")}>Use This</button></Link>
      </div>
      <div className={style.template4}>
        <Link to={'/resume_form'}><button onClick={() => setTheme("4")}>Use This</button></Link>
      </div>
      <div className={style.template5}>
        <Link to={'/resume_form'}><button onClick={() => setTheme("5")}>Use This</button></Link>
      </div>
      <div className={style.template6}>
        <Link to={'/resume_form'}><button onClick={() => setTheme("6")}>Use This</button></Link>
      </div>
      <div className={style.template7}>
        <Link to={'/resume_form'}><button onClick={() => setTheme("7")}>Use This</button></Link>
      </div>
      <div className={style.template8}>
        <Link to={'/resume_form'}><button onClick={() => setTheme("8")}>Use This</button></Link>
      </div>
    </div>
  )
}

export default SelectTemplate