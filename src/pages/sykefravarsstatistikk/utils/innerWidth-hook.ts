export const useInnerWidth = (): number => {
  // TODO: Fix this
  /* const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    useLayoutEffect(() => {
        const updateSize = () => {
            setInnerWidth(window.innerWidth);
        };
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return innerWidth; */

  return 500;
};
