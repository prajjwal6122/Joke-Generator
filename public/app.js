    // Local joke bank (self-contained). Add your own jokes here.
console.log('runnig')
    const JOKES = [
      {cat:'one-liner', text:"I told my computer I needed a break — it said: 'No problem, I'll go to sleep.'"},
      {cat:'pun', text:"I'm reading a book about anti-gravity — it's impossible to put down."},
      {cat:'dad', text:"Why don't eggs tell jokes? They'd crack each other up."},
      {cat:'programming', text:"Why do programmers prefer dark mode? Because light attracts bugs."},
      {cat:'one-liner', text:"Parallel lines have so much in common — it's a shame they'll never meet."},
      {cat:'pun', text:"I used to play piano by ear, but now I use my hands."},
      {cat:'dad', text:"I only know 25 letters of the alphabet. I don't know y."},
      {cat:'programming', text:"There are 10 types of people in this world: those who understand binary and those who don't."},
      {cat:'one-liner', text:"I'd tell you a chemistry joke but I know I wouldn't get a reaction."},
      {cat:'pun', text:"The rotation of earth really makes my day."},
      {cat:'dad', text:"I used to hate facial hair... but then it grew on me."},
      {cat:'programming', text:"A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'"}
    ];

    const jokeEl = document.getElementById('joke');
    const newBtn = document.getElementById('newBtn');
    const copyBtn = document.getElementById('copyBtn');
    const tweetBtn = document.getElementById('tweetBtn');
    const categorySel = document.getElementById('category');
    const countInput = document.getElementById('count');

    function pickJokes(category, count){
      const pool = category === 'any' ? JOKES : JOKES.filter(j => j.cat === category);
      if(pool.length === 0) return [{text:"No jokes in this category yet — try 'Any' or add some!"}];

      const picks = [];
      for(let i=0;i<count;i++){
        const j = pool[Math.floor(Math.random()*pool.length)];
        picks.push(j);
      }
      return picks;
    }

    function showJokes(arr){
      if(!arr || arr.length===0) return;
      if(arr.length===1){
        jokeEl.innerHTML = arr[0].text;
      } else {
        jokeEl.innerHTML = arr.map((j,idx)=>`<strong>${idx+1}.</strong> ${j.text}`).join('<br><br>');
      }
    }

    function newJoke(){
      const cat = categorySel.value;
      let count = parseInt(countInput.value) || 1;
      if(count < 1) count = 1; if(count>5) count = 5;
      const r = pickJokes(cat, count);
      showJokes(r);
      console.log("working")
    }

    newBtn?.addEventListener('click', newJoke);

    copyBtn?.addEventListener('click', async ()=>{
      const text = jokeEl.innerText;
      try{
        await navigator.clipboard.writeText(text);
        copyBtn.innerText = 'Copied!';
        setTimeout(()=> copyBtn.innerText = 'Copy',1200);
      }catch(e){
        alert('Copy failed — your browser may block clipboard access.');
      }
    });

    tweetBtn?.addEventListener('click', ()=>{
      const text = encodeURIComponent(jokeEl.innerText + '\n\nvia Simple Joke Generator');
      const url = `https://twitter.com/intent/tweet?text=${text}`;
      window.open(url,'_blank');
    });

    // Spacebar quick generate (when not focused on an input)
    window?.addEventListener('keydown', (e)=>{
      const active = document.activeElement;
      const isInput = active && (active.tagName === 'INPUT' || active.tagName === 'SELECT' || active.tagName === 'TEXTAREA');
      if(e.code === 'Space' && !isInput){
        e.preventDefault();
        newJoke();
      }
    });

    // Nice little entrance
    (function(){
      setTimeout(()=>{
        jokeEl.style.opacity = 0;
        jokeEl.style.transition = 'opacity 300ms';
        jokeEl.style.opacity = 1;
      },10);
    })();