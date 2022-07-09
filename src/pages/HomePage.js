import React, {useState, useEffect} from 'react'
import Buttons from '../components/buttons/Buttons'
import Card from '../components/Card'
import Inputs from '../components/inputs/Inputs'
import StopWatch from '../components/StopWatch'
import { MAX, options } from '../constants/constants'

const HomePage = () => {
	const [correctans, setCorrectans] = useState(0)   
    const [isActive, setIsActive] = useState(false)
    const [isPaused, setIsPaused] = useState(true)
	const [time, setTime] = useState(0)
	const [answer, setAnswer] = useState('')
	
    const getRandomString = () => {
		let res = ''
		for (let i = 0; i < 1; i++) {
			res = res + options[Math.floor(Math.random() * 10) % MAX]
		}
		return res
	}

	const [alphabet, setAlphabet] = useState(getRandomString())
	const [cardText, setCardText] = useState(alphabet)

    useEffect(() => {
        let interval = null
        if (isActive && isPaused === false) {
            interval = setInterval(() => {
                setTime((time) => time + 10)
            }, 10)
        } else {
            clearInterval(interval)
        }
        return () => {
            clearInterval(interval)
        }
    }, [isActive, isPaused])

    const highScore = localStorage.getItem('highScore')
		? localStorage.getItem('highScore')
		: 0

    const handleStart = () => {
		setIsActive(true)
		setIsPaused(false)
	}

    const generateText = () => {
        const alpha = getRandomString()
        setAlphabet(alpha)
        setCardText(alpha)
    }

	const handleReset = () => {
		setAnswer('')
		setCorrectans(0)
        generateText()
        setIsActive(false)
		setTime(0)
	}

    const handlePenalty = () => {
		setTime(time + 500)
	}


	const checkAnswer = (e) => {
		const userInput = e.target.value
		const isCorrectAnswer =
			userInput.charAt(userInput.length - 1).toLowerCase() === alphabet
		if (isCorrectAnswer) setCorrectans(correctans + 1)
		else handlePenalty()
		setAnswer(userInput.toUpperCase())
		if (userInput.length >= 20) {
			const isSuccess = highScore ? time <= highScore : true
            setIsActive(false)
            if (isSuccess){
                setCardText('success')
                localStorage.setItem('highScore', time)
            }
            else
                setCardText('failure')
		} else {
            generateText()
		}
	}

  return (
		<>
			<p className="text-white text1 pt-5">Type The Alphabet</p>
			<p className="text-white">
				Typing Game to see how fast you type. Timer starts when you do :&#41;
			</p>
			<Card value={cardText} />
			<div className="form-group">
				<StopWatch
					time={time}
                    highScore={highScore}
				/>
				<div className="input-group">
					<Inputs 
						answer={answer}
						checkAnswer={checkAnswer} 
						isActive={isActive} 
					/>
					<Buttons
						isActive={isActive || answer.length >= 20}
						handleReset={handleReset}
						handleStart={handleStart}
					/>
				</div>
			</div>
		</>
	)
}

export default HomePage