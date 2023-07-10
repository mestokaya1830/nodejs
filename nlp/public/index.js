document.getElementById('text1').addEventListener('keyup', async event => {
  if(event.keyCode == 13){
    const result = await fetch(`/past-tense?${new URLSearchParams({
      sentence: event.target.value
    })}`)

    const final = await result.json()
    document.getElementById('paste-tense').innerText = final.pastTense
    document.getElementById('future-tense').innerText = final.futureTense
  }
})