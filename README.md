public class ArrayRotation {

    public static void rotateArrayRight(int[] arr, int rotationCount) {
        if (arr == null || arr.length == 0 || rotationCount <= 0) {
            return; // No rotation needed
        }

        int n = arr.length;
        rotationCount = rotationCount % n; // To handle rotation counts larger than the array size

        // Reverse the first n - rotationCount elements
        reverseArray(arr, 0, n - rotationCount - 1);

        // Reverse the last rotationCount elements
        reverseArray(arr, n - rotationCount, n - 1);

        // Reverse the whole array
        reverseArray(arr, 0, n - 1);
    }

    private static void reverseArray(int[] arr, int start, int end) {
        while (start < end) {
            int temp = arr[start];
            arr[start] = arr[end];
            arr[end] = temp;
            start++;
            end--;
        }
    }

    public static void main(String[] args) {
        int[] inputArray = {1, 2, 3, 4, 5};
        int rotationCount = 2;

        System.out.println("Input Array: " + Arrays.toString(inputArray));
        rotateArrayRight(inputArray, rotationCount);
        System.out.println("Output Array: " + Arrays.toString(inputArray));
    }
}

