<<<<<<< HEAD
import toast from "react-hot-toast"; 
=======
import toast from "react-hot-toast";
>>>>>>> 370a30cc00298b3a5cec866d0798fe32dff9659e
export const validateDescription = (description) => {
  if (description.length <= 5 && description.length >= 2000) {
    toast('Invalid description 5-2000', {
      icon: '❌',
      style: {
        borderRadius: '10px',
        background: '#fff',
        color: '#333',
      },
    });
    return false;
  }
  return true;
}