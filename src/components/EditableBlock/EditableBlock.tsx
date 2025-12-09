// EditableBlock.tsx
import { useState, useEffect } from "react";
import { db } from "./firebase"; // шлях до твого firebase.ts
import { doc, getDoc, setDoc } from "firebase/firestore";
import type { DocumentData, DocumentSnapshot } from "firebase/firestore";

// Тип для даних блоку
interface BlockData {
  text: string;
  image: string;
  button: string;
}

export default function EditableBlock() {
  const [data, setData] = useState<BlockData>({
    text: "",
    image: "",
    button: ""
  });
  const [editMode, setEditMode] = useState<boolean>(false);
  const [tempData, setTempData] = useState<BlockData>(data);

  // Завантаження даних з Firestore
  useEffect(() => {
    const fetchData = async () => {
      const ref = doc(db, "blocks", "demoBlock");
      const snap: DocumentSnapshot<DocumentData> = await getDoc(ref);

      if (snap.exists()) {
        const block = snap.data() as BlockData; // 👈 каст до нашого типу
        setData(block);
        setTempData(block);
      } else {
        const defaultBlock: BlockData = {
          text: "Привіт! Це демо-блок.",
          image: "https://via.placeholder.com/200",
          button: "Купити"
        };
        await setDoc(ref, defaultBlock);
        setData(defaultBlock);
        setTempData(defaultBlock);
      }
    };
    fetchData();
  }, []);

  // Збереження змін
  const handleSave = async () => {
    const ref = doc(db, "blocks", "demoBlock");
    await setDoc(ref, tempData);
    setData(tempData);
    setEditMode(false);
  };

  return (
    <div style={{ border: "1px solid gray", padding: "20px", maxWidth: "400px" }}>
      {!editMode ? (
        <>
          <img src={data.image} alt="demo" style={{ width: "100%" }} />
          <p>{data.text}</p>
          <button>{data.button}</button>
          <br />
          <button onClick={() => setEditMode(true)}>Редагувати</button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={tempData.text}
            onChange={(e) => setTempData({ ...tempData, text: e.target.value })}
            placeholder="Текст"
          />
          <input
            type="text"
            value={tempData.image}
            onChange={(e) => setTempData({ ...tempData, image: e.target.value })}
            placeholder="URL картинки"
          />
          <input
            type="text"
            value={tempData.button}
            onChange={(e) => setTempData({ ...tempData, button: e.target.value })}
            placeholder="Текст кнопки"
          />
          <button onClick={handleSave}>Зберегти зміни</button>
        </>
      )}
    </div>
  );
}
