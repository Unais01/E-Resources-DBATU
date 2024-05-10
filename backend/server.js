const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const { link } = require('fs');
const { log } = require('console');
const app = express();
const PORT = 3000||process.env.PORT;
app.use(cors());
app.use(cors({
  origin: '*' // Replace with your frontend URL
}));


// Sample data structure for storing notes and PYQs
const db = {
  semesters: {
    1: {
      subjects: {
        MATHI: {
          notes: [
            { link: 'https://drive.google.com/file/d/1KjV4EtM_MRF80apII7hccOp8GkjDWYwI/view?usp=drive_link', name: 'MI 2017' },
            { link: 'https://drive.google.com/file/d/1KuC32j99UftPvBGcA40alvZ5pPWaJ60E/view?usp=drive_link', name: 'MI 2018' },
            { link: 'https://drive.google.com/file/d/1KuC32j99UftPvBGcA40alvZ5pPWaJ60E/view?usp=drive_link', name: 'MI 2019' }
          ],
          pyqs: [
            { link: 'https://drive.google.com/file/d/1KjV4EtM_MRF80apII7hccOp8GkjDWYwI/view?usp=drive_link', name: 'MI 2017' },
            { link: 'https://drive.google.com/file/d/1KuC32j99UftPvBGcA40alvZ5pPWaJ60E/view?usp=drive_link', name: 'MI 2018' },
            { link: 'https://drive.google.com/file/d/1KuC32j99UftPvBGcA40alvZ5pPWaJ60E/view?usp=drive_link', name: 'MI 2019' }
          ]

        },
        Chemistry: {
          notes: [{
            link: "https://drive.google.com/file/d/1Uewh6bswQ53Q2kKS4pCeOG4O_nVchtcX/view?usp=drive_link", name: "notes"
          }],
          pyqs: [
            { link: 'https://drive.google.com/file/d/1KjV4EtM_MRF80apII7hccOp8GkjDWYwI/view?usp=drive_link', name: 'Chemistry 2017' },
            { link: 'https://drive.google.com/file/d/1saHOs6TMJojSF0TQFWv9lbY6RnpRdw64/view?usp=drive_link', name: 'Chemistry 2018' },

          ]
        },
        Mechanics: {
          notes: [{
            link: "https://drive.google.com/file/d/18uLoGFPTPOp-9sJkXcWO4l7HNsyX0e8e/view?usp=drive_link", name: "Refrence book"
          }],
          pyqs: [
            { link: 'https://drive.google.com/file/d/1Hh3Aa-Z3GY7bjwdO0FVHhQNyvFjNDQqu/view?usp=drive_link', name: 'Mechanics 2018' },
            { link: 'https://drive.google.com/file/d/1JMO6xrFbAtxiCpbcaz-eRx3h6fteefZn/view?usp=drive_link', name: 'Mechanics 2019' }
          ]
        },
        Cprogramming: {
          notes: [{
            link: "https://drive.google.com/file/d/1-JripzcgKr0w0DNRh0j_fqde3uFw5ZjS/view?usp=drive_link", name: "Refrence book"
          }],
          pyqs: [
            { link: 'https://drive.google.com/file/d/1IxBM40o_qDLAmjzLEw5wrAOZm6cj5kyF/view?usp=drive_link', name: 'C programming 2018' },
            { link: 'https://drive.google.com/file/d/1Iobf2UOTTw0Y6veaJrBQYvrIKfstzmtR/view?usp=drive_link', name: 'C programming 2019' }
          ]
        },
        BEE: {
          notes: ['bee'],
          pyqs: ['2020', '2021', '2022']
        }
      }
    },
    2: {
      subjects: {
        MATHII: {
          notes: ['math II'],
          pyqs: [
            { link: 'https://drive.google.com/file/d/1sHAxwfa0Yudrjcg-fPH7bhqywEs3fGXt/view?usp=drive_link', name: 'MII 2018' },
            { link: 'https://drive.google.com/file/d/1Iobf2UOTTw0Y6veaJrBQYvrIKfstzmtR/view?usp=drive_link', name: 'MII 2019' }
          ]
        },
        Physics: {
          notes: ['physics'],
          pyqs: [
            { link: 'https://drive.google.com/file/d/1Hflf1Rr8ldgIHjHpcmETJt0SJv53ePpH/view?usp=drive_link', name: 'Eng Physics 2018' },
            { link: 'https://drive.google.com/file/d/1KNYHtmWhjvFovC7QCH2fi1--tXskwvv4/view?usp=drive_link', name: 'Eng Physics 2019' }
          ]
        },
        Graphics: {
          notes: ['Graphics'],
          pyqs: [
            { link: 'https://drive.google.com/file/d/1IXdLefvDQG86vsy3ZmaYovUxD6z_RA0f/view?usp=drive_link', name: ' Eng Graphics 2017' },
            { link: 'https://drive.google.com/file/d/1HixvHcZQRQ_PwQ7X7qEQtt9m9RwTmS6b/view?usp=drive_link', name: 'Eng Graphics 2018' },
            { link: 'https://drive.google.com/file/d/1IhI6PlK59qWRbrJRGu0sH96-8ONsL5WW/view?usp=drive_link', name: 'Eng Graphics 2019' }
          ]
        },
        CommunicationSkills: {
          notes: ['Communication Skills'],
          pyqs: [
            { link: 'https://drive.google.com/file/d/1J-pPZIAhGt0h3Cx1nguXDG9dIJbD5lc4/view?usp=drive_link', name: 'Communication Skills 2017' },
            { link: 'https://drive.google.com/file/d/1HkAonPaw5hAbCJHQpiNOH8Vn4_ebXvkP/view?usp=drive_link', name: 'Communication Skills 2018' },
            { link: 'https://drive.google.com/file/d/1J6bgcMWNefVG4tXZ3UifqVgf-7CQdArP/view?usp=drive_link', name: 'Communication Skills 2019' }
          ]
        },
        EEE: {
          notes: ['Environment and energy engineering'],
          pyqs: [
            { link: 'https://drive.google.com/file/d/1JXpQlN2-EuIvIN4qIaH9T2j5SYkeuCTe/view?usp=drive_link', name: 'EEE  2017' },
            { link: 'https://drive.google.com/file/d/1JQm9MI2CRamP0-KF14opdRYYBZF1iTM0/view?usp=drive_link', name: 'EEE  2018' },
            { link: 'https://drive.google.com/file/d/1JVvejeA9H0yr9oF-E60dNqDtKE55zSeC/view?usp=drive_link', name: 'EEE  2019' }
          ]
        }
      }
    },
    3: {
      subjects: {
        MATHIII: {
          notes: ['M III'],
          pyqs: [
            { link: 'https://drive.google.com/file/d/1VdSpkQZN978eXID1wn_LYFr-rm5UALGJ/view?usp=drive_link', name: 'MIII 2022' },
            { link: 'https://drive.google.com/file/d/1HrkRJNb0cpNqukRbYyGvJlo-JfO378WW/view?usp=drive_link', name: 'MIII 2019' }
          ]
        },

        DM: {
          notes: ['DM'],
          pyqs: [
            { link: 'https://drive.google.com/file/d/1Hpg69GAIB2YBGTzBHW8nU-3DaVyLHMZ6/view?usp=drive_link', name: 'DM 2018' },
            { link: 'https://drive.google.com/file/d/1LhJU0oozyG8pCjaGfOv6L8S4xYxb4llD/view?usp=drive_link', name: 'DM 2019' }
          ]
        },
        DSA: {
          notes: ['DSA'],
          pyqs: [
            { link: 'https://drive.google.com/file/d/1Hq-bT6y_jDC89_68HPudwCjFPGfmvNxo/view?usp=drive_link', name: 'DSA 2018' },
            { link: 'https://drive.google.com/file/d/1O35ShH4KGSiWnVh92n0JMPYJ3J6otZKi/view?usp=drive_link', name: 'DSA 2019' }
          ]
        },
        COA: {
          notes: ['COA'],
          pyqs: [
            { link: 'https://drive.google.com/file/d/1IErW2IB0E1gdRjSuoPsnxhbgZhIwnX8N/view?usp=drive_link', name: 'COA 2017' },
            { link: 'https://drive.google.com/file/d/1R9wQJj60pfKCPhrDBM_erso1B0hANm3K/view?usp=drive_link', name: 'COA 2019' }
          ]
        },
        Java: {
          notes: ['M III'],
          pyqs: [
            { link: 'https://drive.google.com/file/d/1VdSpkQZN978eXID1wn_LYFr-rm5UALGJ/view?usp=drive_link', name: 'MIII 2022' },
            { link: 'https://drive.google.com/file/d/1HrkRJNb0cpNqukRbYyGvJlo-JfO378WW/view?usp=drive_link', name: 'MIII 2019' }
          ]
        }
      }
    },
    4: {
      subjects: {
        DAA: {},
        OS: {},
        PS: {},
        BHR: {},
        DLDM: {}
      }
    },
    5: {
      subjects: {
        DBS: {
          notes: [{
            link: "https://drive.google.com/file/d/15ofUsIACZPlysEFMJyx5Xt_V1JyFNrga/view?usp=drive_link", name: "Refrence Book"
          }],
          pyqs: [
            { link: 'https://drive.google.com/file/d/19n2F9FDuTK4uAv4aL2qjHQEVjfTXuYpI/view?usp=drive_link', name: 'DBS 2019' },
            { link: 'https://drive.google.com/file/d/1HrkRJNb0cpNqukRbYyGvJlo-JfO378WW/view?usp=drive_link', name: 'DBS 2018' }
          ]
        },
        TOC: {
          notes: [{
            link: "https://drive.google.com/file/d/173-tzpTlutzbV8f7D7u-6nmAGR79w6aN/view?usp=drive_link", name: "Refrence Book"
          }],
          pyqs: [
            { link: 'https://drive.google.com/file/d/19meV7KOGKrMnzlugcgDM1SzwI3_hs5DI/view?usp=drive_link', name: 'TOC 2019' },
            { link: 'https://drive.google.com/file/d/1E3d5Vw5KYqPJQZrixg_R2oMyGsDe83GS/view?usp=drive_link', name: 'TOC 2022' }
          ]
        },
        SE: {
          notes: [{
            link: "https://drive.google.com/file/d/17Vc2KTuzUX7-XQ2jlL9QF_UmufaGnjAc/view?usp=drive_link", name: "Refrence Book"
          }], pyqs: [
            { link: 'https://drive.google.com/file/d/1EMEICHY70vDgsmlVU0Va6KJgNWxWhB9C/view?usp=drive_link', name: 'SE 2022' }
          ]
        },
        HCI: {
          notes: [{
            link: "https://drive.google.com/file/d/18AnfwGakgXRCyYEvr7FLgBwpP-mv8-Zo/view?usp=drive_link", name: "Refrence Book"
          }], pyqs: [
            { link: 'https://drive.google.com/file/d/1EE7r_PxbYxJSaSMUqCUPIXwgo_T5xu7u/view?usp=drive_link', name: 'HCI 2019' }
          ]
        },
        BC: {
          notes: [{
            link: "https://drive.google.com/file/d/15ofUsIACZPlysEFMJyx5Xt_V1JyFNrga/view?usp=drive_link", name: "Refrence Book"
          }], pyqs: [
            { link: 'https://drive.google.com/file/d/1A8-gmtwtdyGpXGj7edApqyfUaUWBANr7/view?usp=drive_link', name: 'BC 2019' }

          ]
        }
      }
    },
    6: {
      subjects: {
        CD: {
          notes: [{
            link: 'https://drive.google.com/file/d/1SHof0-__RN34fm7LEll4szUxFWqNAJLR/view?usp=drive_link', name: 'Refrence book'
          }],
          pyqs: [
            { link: 'https://drive.google.com/file/d/1USv4e7h5SMoyQK9IcANxi3oNDkdXssmd/view?usp=drive_link', name: 'CD 2019' },
            { link: 'https://drive.google.com/file/d/1elILAgZnrG_-NAs-Qadszxwda8JqqTBy/view?usp=drive_link', name: 'CD 2022' }
          ]
        },
        CN: {
          notes: [{
            link: "https://drive.google.com/file/d/1Sg0qC-F_yFFofCx6FahGk0q5_95PzAFF/view?usp=drive_link", name: "Refrence Book"
          }],
          pyqs: [
            { link: 'https://drive.google.com/file/d/1URM8mWCuKB0FK3zAglqG50OiJlkxOOYT/view?usp=drive_link', name: 'CN 2019' },
            { link: 'https://drive.google.com/file/d/1er4DDJ-GeQ2DGw_cHApcbYSZgzw8dGnb/view?usp=drive_link', name: 'CN 2022' },
            { link: 'https://drive.google.com/file/d/1euiHCKIgigrCfGC5IHGizsq40Xeg6x7V/view?usp=drive_link', name: 'CN 2014' },
          ]
        },
        ML: {
          notes: [{
            link: "https://drive.google.com/file/d/1T93001-1PaA7VnNs5sDc8HX7UuweW-6B/view?usp=drive_link", name: "Refrence Book"
          }], pyqs: [
            { link: 'https://drive.google.com/file/d/1fIvXy5XE1mK0UbIoFWeYKH3i1bmqQncD/view?usp=drive_link', name: 'ML 2017' },
            { link: 'https://drive.google.com/file/d/1fBRkuCe8PtSdmbEkjPA4RiGxYn4sxWXv/view?usp=drive_link', name: 'ML 2018' },
            { link: 'https://drive.google.com/file/d/1f8_nbF_pYJbyUoEb0hyAgX2A__4o5-rI/view?usp=drive_link', name: 'ML 2019' },
            { link: 'https://drive.google.com/file/d/1elILAgZnrG_-NAs-Qadszxwda8JqqTBy/view?usp=drive_link', name: 'ML 2022' }
          ]
        },
        IoT: {
          notes: [{
            link: "https://drive.google.com/file/d/1c1dtmEDJhqxXbsOaf035oW5nE1OBOlCk/view?usp=drive_link", name: "Refrence Book"
          }], pyqs: [
            { link: "https://drive.google.com/file/d/1fJjKI5u-cSAeBm3GvN3ilWXVodcH2CK5/view?usp=drive_link", name: 'IoT 2019' }
          ]
        },
        CB: {
          notes: [{
            link: "https://drive.google.com/drive/u/1/folders/1ibLDTUbqqN609_JiGrstPFzVcmoiVGnj", name: "Coming Soon"
          }], pyqs: [
            { link: "https://drive.google.com/drive/u/1/folders/1ibLDTUbqqN609_JiGrstPFzVcmoiVGnj", name: 'Coming Soon' }
          ]
        }
      }
    },
    7: {
      subjects: {
        AI: {},
        BI: {},
        DT: {},
        xxu: {},
        DF: {}
      }
    }
  }
};

app.use(bodyParser.json());

// Routes for managing notes and PYQs
app.get('/', (req, res) => {
  console.log(__dirname);
  console.log('hello');
  res.sendFile(path.join(__dirname, 'index.html'));
})


app.get('/semesters/:semester/subjects/:subject/notes', (req, res) => {
  const { semester, subject } = req.params;
  res.json(db.semesters[semester].subjects[subject].notes);
});



app.get('/semesters/:semester/subjects/:subject/pyqs', (req, res) => {
  const { semester, subject } = req.params;
  res.json(db.semesters[semester].subjects[subject].pyqs);

});



app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
