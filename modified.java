import java.util.*;

public class modified {
    private static List<String> moves = new ArrayList<>();
    private static int selectedDiskCount = 0;
    private static int stepCount = 0;
   

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("=== Tower of Hanoi Console Version ===");

        while (true) {
            System.out.print("\nEnter number of disks (e.g., 3, 7, 9) or 0 to exit: ");
            selectedDiskCount = scanner.nextInt();
            if (selectedDiskCount == 0) break;

            moves.clear();
            stepCount = 0;

            long startTime = System.nanoTime();
            hanoi(selectedDiskCount, 'A', 'C', 'B');
            long endTime = System.nanoTime();
            double duration = (endTime - startTime)/1_000_000.0;

            int totalMoves = moves.size();

            System.out.println("\nTotal Moves: " + totalMoves);
            System.out.println("Time Complexity: O(2^" + selectedDiskCount + ")");
            System.out.printf("Execution Time: %.3f ms\n", duration);


            System.out.println("\nStarting disk movements...\n");
            for (String move : moves) {
                stepCount++;
                System.out.println("Step " + stepCount + ": " + move);
            }

            System.out.println("\n🎉 Finished moving all disks!\n");
            System.out.println("Would you like to try again? (y/n): ");
            if (!scanner.next().equalsIgnoreCase("y")) break;
        }

        System.out.println("Goodbye!");
        scanner.close();
    }

    private static void hanoi(int n, char fromRod, char toRod, char auxRod) {
        if (n == 1) {
            moves.add("Move disk from " + fromRod + " to " + toRod);
            return;
        }
        hanoi(n - 1, fromRod, auxRod, toRod);
        moves.add("Move disk from " + fromRod + " to " + toRod);
        hanoi(n - 1, auxRod, toRod, fromRod);
    }
}

