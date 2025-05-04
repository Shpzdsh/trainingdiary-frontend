export interface Exercise {
  id: number;
  name: string;
  description: string;
  muscleGroup: string;
  workoutId: number;
}

export interface ExerciseDto {
  name: string;
  description: string;
  muscleGroup: string;
  workoutId: number;
}
