const nietjesForm = document.getElementById('nietjes-form')
const nietjesId = document.getElementById('nietjes-id')
const nietjesAdres = document.getElementById('nietjes-adres')

// Zend POST naar API om een nietje toe te voegen
async function addNietje(e) {
  e.preventDefault()

  if (nietjesId.value === '' || nietjesAdres.value === '') {
    alert('Je moet beide velden invullen')
  }

  const sendBody = {
    nietjes_Id: nietjesId.value,
    address: nietjesAdres.value,
  }

  try {
    const res = await fetch('/api/v1/nietjes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sendBody),
    })

    if (res.status === 400) {
      throw Error('ID is niet uniek!')
    }

    alert('Nietje geplaatst!')
    window.location.href = '/index.html'
  } catch (err) {
    alert(err)
    return
  }
}

nietjesForm.addEventListener('submit', addNietje)
