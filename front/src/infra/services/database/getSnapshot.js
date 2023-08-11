import { getDoc, doc } from 'firebase/firestore'
import { getInfraServices } from "@/infra/infra"

async function getSnapshot ({ documentId, userUid }) {
  if (!userUid) throw new Error('Unknown userUid')
  const { database } = getInfraServices()
  const documentRef = doc(database, documentId, userUid)
  const documentSnap = await getDoc(documentRef)

  return {
    data: documentSnap.data(),
    existsDocument: documentSnap.exists(),
    documentSnap,
    documentRef,
  }
}

export {
  getSnapshot,
}
