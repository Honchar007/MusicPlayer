import { v4 as uuidv4 } from "uuid";

function chillHop() {
  return [
    {
      name: "ramona",
      cov: "https://f4.bcbits.com/img/a1810159296_16.jpg",
      artist: "j`san, Kyle McEvoy",
      audio: "https://mp3.chillhop.com/serve.php/?mp3=3265",
      color: ["#edd9de", "#24264b"],
      id: uuidv4(),
      active: true,
    },
    {
      name: "Drift",
      artist: "I AND YOU",
      color: ["#164364", "#164364"],
      id: uuidv4(),
      active: false,
      cov: "https://i1.sndcdn.com/artworks-000060193081-qq0ggb-t500x500.jpg",
      audio: "https://mp3.chillhop.com/serve.php/?mp3=13091",
    },
    {
      name: "Cascade",
      artist: "YOU AND I",
      color: ["#f598fd", "#c1c6fb"],
      id: uuidv4(),
      active: false,
      cov: "https://static.qobuz.com/images/covers/wa/cl/i6l2ji3b0clwa_600.jpg",
      audio: "https://mp3.chillhop.com/serve.php/?mp3=2365",
    },
  ];
}

export default chillHop;
