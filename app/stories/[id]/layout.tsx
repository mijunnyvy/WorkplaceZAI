// Generate static params for common story IDs
export async function generateStaticParams() {
  // Generate params for common story IDs - you can expand this list
  const storyIds = [
    'prophet-yusuf', 'prophet-musa', 'prophet-ibrahim', 'prophet-isa',
    'prophet-muhammad', 'abu-bakr', 'umar-ibn-khattab', 'uthman-ibn-affan',
    'ali-ibn-abi-talib', 'bilal-ibn-rabah', 'khadijah', 'aisha',
    'people-of-cave', 'elephant-army', 'night-journey', 'hijra'
  ];
  
  return storyIds.map((id) => ({
    id: id,
  }));
}

export default function StoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
